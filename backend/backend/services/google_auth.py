from typing import Any

import requests as http_requests
from fastapi import HTTPException, status


def verify_google_access_token(access_token: str) -> dict[str, Any]:
    """Verify a Google OAuth2 access_token by calling Google's userinfo endpoint."""
    try:
        resp = http_requests.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            headers={"Authorization": f"Bearer {access_token}"},
            timeout=10,
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Failed to reach Google userinfo endpoint.",
        ) from exc

    if resp.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Google access token.",
        )

    payload = resp.json()
    if not payload.get("email"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Google account email missing or not verified.",
        )
    return payload
