from typing import Optional
import uuid

from fastapi import Depends, Request
from fastapi_users import BaseUserManager, FastAPIUsers, UUIDIDMixin, schemas
from fastapi_users.authentication import (
    AuthenticationBackend,
    BearerTransport,
    JWTStrategy
)
from fastapi_users.db import (
    SQLAlchemyUserDatabase,
)
from db.models.users.depends import get_user_db, User

# BACKEND LOGIC FOR USERS 


## REMOVE THIS SOON 
SECRET = "SECRET"

class UserManager(UUIDIDMixin, BaseUserManager[User, uuid.UUID]):
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET
    async def on_after_register(self, user: User, request: Request | None = None) -> None:
        print(f"User {user.id} has registered.")
        
    async def on_after_forgot_password(self, user: User, token:str, request: Request | None = None) -> None:
        print(f"User {user.id} has forgot their password. Reset token: {token}")
    
    async def on_after_request_verify(self, user: User, token: str, request: Request | None = None) -> None:
        print(f"Verification requested for user {user.id}. Verification token: {token}")
        

async def get_user_manager(user_db: SQLAlchemyUserDatabase = Depends(get_user_db)):
    yield UserManager(user_db, User)
    
bearer_trasnport = BearerTransport(tokenUrl="/auth/jwt/login")

def get_jwt_stratagy() -> JWTStrategy:
    return JWTStrategy(secret=SECRET, lifetime_seconds=3600)

auth_backend = AuthenticationBackend(
    name="jwt",
    transport=bearer_trasnport,
    strategy=get_jwt_stratagy(),
)

fastapi_users = FastAPIUsers[User, uuid.UUID](get_user_manager, [auth_backend])
current_active_user = fastapi_users.current_user(active=True)