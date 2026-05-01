import logging
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

logger = logging.getLogger("backend.notifications")


def _smtp_cfg():
    return {
        "host": os.getenv("SMTP_HOST", "sandbox.smtp.mailtrap.io"),
        "port": int(os.getenv("SMTP_PORT", "587")),
        "user": os.getenv("SMTP_USER", ""),
        "password": os.getenv("SMTP_PASSWORD", ""),
    }


def _twilio_cfg():
    return {
        "account_sid": os.getenv("TWILIO_ACCOUNT_SID", ""),
        "auth_token": os.getenv("TWILIO_AUTH_TOKEN", ""),
        "verify_sid": os.getenv("TWILIO_VERIFY_SERVICE_SID", ""),
    }


def send_email_otp(to_email: str, otp_code: str) -> None:
    cfg = _smtp_cfg()
    if not cfg["user"] or not cfg["password"]:
        logger.warning("SMTP credentials not configured — skipping email send.")
        return

    msg = MIMEMultipart("alternative")
    msg["Subject"] = "Your AmbedkarGPT verification code"
    msg["From"] = f"AmbedkarGPT <{cfg['user']}>"
    msg["To"] = to_email

    plain = (
        f"Your AmbedkarGPT verification code is: {otp_code}\n\n"
        "This code expires in 10 minutes. Do not share it with anyone."
    )
    html = f"""<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0a1128;font-family:sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:40px 16px">
      <table width="480" cellpadding="0" cellspacing="0"
             style="background:#0d1b3e;border-radius:12px;border:1px solid #1e3260">
        <tr><td style="padding:32px 32px 8px">
          <h1 style="margin:0;font-size:22px;color:#6b8aff">AmbedkarGPT</h1>
        </td></tr>
        <tr><td style="padding:8px 32px;color:#c5cde8;font-size:15px">
          <p style="margin:0">Use the code below to verify your email address:</p>
        </td></tr>
        <tr><td align="center" style="padding:24px 32px">
          <div style="font-size:42px;font-weight:700;letter-spacing:10px;color:#fff;
                      background:#1a2a5e;padding:20px 32px;border-radius:10px;
                      display:inline-block">{otp_code}</div>
        </td></tr>
        <tr><td style="padding:8px 32px 32px;color:#8b94b8;font-size:12px">
          This code expires in 10&nbsp;minutes. Do not share it with anyone.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>"""

    msg.attach(MIMEText(plain, "plain"))
    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP(cfg["host"], cfg["port"]) as server:
        server.starttls()
        server.login(cfg["user"], cfg["password"])
        server.sendmail(cfg["user"], to_email, msg.as_string())

    logger.info("OTP email sent to %s", to_email)


def send_phone_verification(phone: str) -> None:
    """Trigger Twilio Verify — Twilio generates & sends the OTP via SMS."""
    cfg = _twilio_cfg()
    if not cfg["account_sid"] or not cfg["verify_sid"]:
        logger.warning("Twilio credentials not configured — skipping SMS send.")
        return
    from twilio.rest import Client  # lazy import so non-phone paths don't need twilio installed
    client = Client(cfg["account_sid"], cfg["auth_token"])
    client.verify.v2.services(cfg["verify_sid"]).verifications.create(to=phone, channel="sms")
    logger.info("Twilio verification SMS sent to %s", phone)


def check_phone_verification(phone: str, code: str) -> bool:
    """Ask Twilio Verify whether the code the user entered is correct."""
    cfg = _twilio_cfg()
    if not cfg["account_sid"] or not cfg["verify_sid"]:
        logger.warning("Twilio credentials not configured — phone check skipped.")
        return False
    from twilio.rest import Client
    client = Client(cfg["account_sid"], cfg["auth_token"])
    result = client.verify.v2.services(cfg["verify_sid"]).verification_checks.create(
        to=phone, code=code
    )
    return result.status == "approved"
