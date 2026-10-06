import os
import jwt
from jwt import PyJWKClient
from dotenv import load_dotenv
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

load_dotenv()

TENANT_ID = os.environ["TENANT_ID"]
API_CLIENT_ID = os.environ["API_CLIENT_ID"]
ISSUER = f"https://login.microsoftonline.com/{TENANT_ID}/v2.0"
JWKS_URL = f"https://login.microsoftonline.com/{TENANT_ID}/discovery/v2.0/keys"

jwks_client = PyJWKClient(JWKS_URL)
bearer = HTTPBearer()

app = FastAPI(title="ATS API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("ALLOWED_ORIGIN", "http://localhost:5173")],
    allow_methods=["*"],
    allow_headers=["Authorization", "Content-Type"],
)


def current_user(creds: HTTPAuthorizationCredentials = Depends(bearer)) -> dict:
    """Validate the Entra access token and return its claims."""
    try:
        key = jwks_client.get_signing_key_from_jwt(creds.credentials).key
        claims = jwt.decode(
            creds.credentials,
            key,
            algorithms=["RS256"],
            audience=API_CLIENT_ID,
            issuer=ISSUER,
        )
    except jwt.PyJWTError as e:
        print("Token validation failed:", e)  # server log only
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    if "access_as_user" not in claims.get("scp", "").split():
        raise HTTPException(status_code=403, detail="Missing required scope")
    return claims


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/me")
def me(user: dict = Depends(current_user)):
    return {
        "name": user.get("name"),
        "email": user.get("preferred_username"),
        "object_id": user.get("oid"),
    }