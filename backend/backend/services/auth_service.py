import logging

from fastapi import HTTPException, status

from backend.core.auth_constants import (
    AUTH_PROVIDER_GOOGLE,
    AUTH_PROVIDER_PASSWORD,
    OTP_PURPOSE_LOGIN_VERIFY,
    OTP_PURPOSE_SIGNUP_VERIFY,
)
from backend.core.config import settings
from backend.repositories.otp_repo import OtpRepository
from backend.repositories.sessions_repo import SessionsRepository
from backend.repositories.users_repo import UsersRepository
from backend.schemas.auth import AuthResponse, AuthTokens, UserPublic
from backend.services import notification_service
from backend.services.google_auth import verify_google_access_token
from backend.services.otp_service import build_hashed_otp, otp_expiry_time
from backend.services.security import hash_password, verify_otp_hash, verify_password
from backend.services.token_service import create_access_token, create_refresh_token, decode_token

logger = logging.getLogger("backend.auth")


class AuthService:
    def __init__(self) -> None:
        self.users_repo = UsersRepository()
        self.otp_repo = OtpRepository()
        self.sessions_repo = SessionsRepository()

    def signup(
        self,
        username: str,
        password: str,
        email: str | None,
        phone: str | None,
        political_party: str | None,
    ) -> AuthResponse:
        if self.users_repo.find_by_username(username):
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Username already exists.")
        if email and self.users_repo.find_by_email(email):
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already exists.")
        if phone and self.users_repo.find_by_phone(phone):
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Phone already exists.")

        user = self.users_repo.create_user(
            username=username,
            password_hash=hash_password(password) if password else None,
            email=email,
            phone=phone,
            political_party=political_party,
            auth_providers=[AUTH_PROVIDER_PASSWORD],
        )

        channel = "email" if email else "phone"
        target = email or phone or ""
        auth_response = self._issue_session(user, otp_required=True, otp_target=target)

        otp_code = self._send_otp(
            user_id=user["_id"],
            channel=channel,
            target=target,
            purpose=OTP_PURPOSE_SIGNUP_VERIFY,
        )
        if otp_code:
            auth_response.dev_otp = otp_code

        return auth_response

    def verify_otp(self, target: str, channel: str, otp_code: str, purpose: str) -> dict:
        dev_mode = settings.app_env in {"development", "dev", "test", "testing"}

        if channel == "phone" and not dev_mode:
            # Production: delegate to Twilio Verify
            approved = notification_service.check_phone_verification(target, otp_code)
            if not approved:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid OTP.")
            user = self.users_repo.find_by_phone(target)
            if user:
                self.users_repo.verify_channel(user["_id"], channel)
            return {"message": "OTP verified successfully."}

        # Dev mode phone OR any email: verify against DB
        otp_doc = self.otp_repo.get_active_otp(target=target, channel=channel, purpose=purpose)
        if not otp_doc:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="OTP not found or expired.")

        if otp_doc.get("attempt_count", 0) >= otp_doc.get("max_attempts", settings.otp_max_attempts):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="OTP max attempts exceeded.")

        if not verify_otp_hash(otp_code, otp_doc["otp_hash"]):
            self.otp_repo.increment_attempt(otp_doc["_id"])
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid OTP.")

        self.otp_repo.consume(otp_doc["_id"])
        user_id = otp_doc.get("user_id")
        if user_id:
            self.users_repo.verify_channel(user_id, channel)
        return {"message": "OTP verified successfully."}

    def resend_otp(self, target: str, channel: str, purpose: str) -> dict:
        if channel == "email":
            user = self.users_repo.find_by_email(target)
            if not user:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No account found.")
            self.otp_repo.invalidate_all(target=target, channel=channel, purpose=purpose)
            otp_code, otp_hash = build_hashed_otp()
            self.otp_repo.create_otp(
                user_id=user["_id"],
                channel=channel,
                target=target,
                otp_hash=otp_hash,
                purpose=purpose,
                max_attempts=settings.otp_max_attempts,
                expires_at=otp_expiry_time(),
            )
            self._try_send(lambda: notification_service.send_email_otp(target, otp_code))
            result: dict = {"message": "A new code has been sent."}
            if settings.auth_debug_return_otp and settings.app_env in {"development", "dev", "test", "testing"}:
                result["dev_otp"] = otp_code
            return result
        else:
            user = self.users_repo.find_by_phone(target)
            if not user:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No account found.")
            self.otp_repo.invalidate_all(target=target, channel="phone", purpose=purpose)
            otp_code = self._send_otp(
                user_id=user["_id"],
                channel="phone",
                target=target,
                purpose=purpose,
            )
            result: dict = {"message": "A new code has been sent."}
            if otp_code:
                result["dev_otp"] = otp_code
            return result

    def login(self, identifier: str, password: str | None) -> AuthResponse:
        user = self.users_repo.find_by_identifier(identifier)
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials.")

        # Passwordless phone login — send OTP immediately
        if not user.get("password_hash"):
            channel = "phone" if user.get("phone") else "email"
            target  = user.get("phone") or user.get("email") or ""
            auth_response = self._issue_session(user, otp_required=True, otp_target=target)
            otp_code = self._send_otp(
                user_id=user["_id"],
                channel=channel,
                target=target,
                purpose=OTP_PURPOSE_LOGIN_VERIFY,
            )
            if otp_code:
                auth_response.dev_otp = otp_code
            return auth_response

        if not password or not verify_password(password, user["password_hash"]):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials.")

        if not (user.get("is_email_verified") or user.get("is_phone_verified")):
            channel = "email" if user.get("email") else "phone"
            target = user.get("email") or user.get("phone") or ""
            auth_response = self._issue_session(user, otp_required=True, otp_target=target)
            otp_code = self._send_otp(
                user_id=user["_id"],
                channel=channel,
                target=target,
                purpose=OTP_PURPOSE_LOGIN_VERIFY,
            )
            if otp_code:
                auth_response.dev_otp = otp_code
            return auth_response

        return self._issue_session(user)

    def google_login(self, access_token: str, political_party: str | None = None) -> AuthResponse:
        payload = verify_google_access_token(access_token)
        email = payload.get("email")
        if not email:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Google account email missing.")
        user = self.users_repo.upsert_google_user(
            email=email,
            username_seed=payload.get("name") or email.split("@")[0],
            political_party=political_party,
        )
        if AUTH_PROVIDER_GOOGLE not in user.get("auth_providers", []):
            user["auth_providers"] = sorted(set(user.get("auth_providers", []) + [AUTH_PROVIDER_GOOGLE]))
        return self._issue_session(user)

    def refresh(self, refresh_token: str) -> AuthResponse:
        session_doc = self.sessions_repo.find_active_by_refresh(refresh_token)
        if not session_doc:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token.")
        payload = decode_token(refresh_token)
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token type.")
        user = self.users_repo.find_by_id(str(session_doc["user_id"]))
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")

        access_token, access_expires_at = create_access_token(str(user["_id"]))
        new_refresh_token, refresh_expires_at = create_refresh_token(str(user["_id"]))
        self.sessions_repo.rotate_tokens(
            session_doc["_id"], access_token, new_refresh_token, access_expires_at, refresh_expires_at
        )
        return self._build_auth_response(user, access_token, new_refresh_token, access_expires_at, refresh_expires_at)

    def logout(self, refresh_token: str) -> dict:
        revoked = self.sessions_repo.revoke_by_refresh(refresh_token)
        if not revoked:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found.")
        return {"message": "Logged out successfully."}

    def me(self, bearer_token: str) -> UserPublic:
        payload = decode_token(bearer_token)
        if payload.get("type") != "access":
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid access token.")
        user = self.users_repo.find_by_id(payload["sub"])
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")
        return self._to_user_public(user)

    # ── Private helpers ───────────────────────────────────────────────────────

    def _send_otp(self, user_id, channel: str, target: str, purpose: str) -> str | None:
        """Generate & deliver an OTP. Returns the plaintext code only in dev mode (for dev_otp)."""
        dev_mode = settings.app_env in {"development", "dev", "test", "testing"}

        if channel == "phone" and not dev_mode:
            # Production: Twilio Verify handles code generation + delivery
            self._try_send(lambda: notification_service.send_phone_verification(target))
            return None

        # Dev mode phone OR any email: generate locally, store in DB, send via SMTP
        otp_code, otp_hash = build_hashed_otp()
        self.otp_repo.create_otp(
            user_id=user_id,
            channel=channel,
            target=target,
            otp_hash=otp_hash,
            purpose=purpose,
            max_attempts=settings.otp_max_attempts,
            expires_at=otp_expiry_time(),
        )
        if channel == "email":
            self._try_send(lambda: notification_service.send_email_otp(target, otp_code))

        if settings.auth_debug_return_otp and dev_mode:
            return otp_code
        return None

    @staticmethod
    def _try_send(fn) -> None:
        """Fire notification; log but never crash the request if it fails."""
        try:
            fn()
        except Exception as exc:  # noqa: BLE001
            logger.warning("Notification send failed: %s", exc)

    def _issue_session(self, user: dict, otp_required: bool = False, otp_target: str | None = None) -> AuthResponse:
        access_token, access_expires_at = create_access_token(str(user["_id"]))
        refresh_token, refresh_expires_at = create_refresh_token(str(user["_id"]))
        self.sessions_repo.create_session(
            user_id=user["_id"],
            access_token=access_token,
            refresh_token=refresh_token,
            access_expires_at=access_expires_at,
            refresh_expires_at=refresh_expires_at,
        )
        self.users_repo.update_last_login(user["_id"])
        return self._build_auth_response(
            user, access_token, refresh_token, access_expires_at, refresh_expires_at, otp_required, otp_target
        )

    def _to_user_public(self, user: dict) -> UserPublic:
        return UserPublic(
            id=str(user["_id"]),
            username=user["username"],
            email=user.get("email"),
            phone=user.get("phone"),
            political_party=user.get("political_party"),
            is_email_verified=bool(user.get("is_email_verified")),
            is_phone_verified=bool(user.get("is_phone_verified")),
            auth_providers=user.get("auth_providers", []),
            created_at=user["created_at"],
        )

    def _build_auth_response(
        self,
        user: dict,
        access_token: str,
        refresh_token: str,
        access_expires_at,
        refresh_expires_at,
        otp_required: bool = False,
        otp_target: str | None = None,
    ) -> AuthResponse:
        return AuthResponse(
            user=self._to_user_public(user),
            tokens=AuthTokens(
                access_token=access_token,
                refresh_token=refresh_token,
                access_expires_at=access_expires_at,
                refresh_expires_at=refresh_expires_at,
            ),
            otp_required=otp_required,
            otp_target=otp_target,
        )
