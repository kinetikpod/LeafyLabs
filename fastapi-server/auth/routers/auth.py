from fastapi import APIRouter, Depends, BackgroundTasks, status, Response
from auth.core.dependencies import get_auth_service
from auth.services.auth import AuthService
from auth.schemas.user import (
    MessageResponse,
    SignupIn,
    SigninIn,
    PasswordResetRequest,
    PasswordResetInput,
    VerifyEmailPayload,
    UserOut,
)
from auth.core.dependencies import get_current_user

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def signup(
    payload: SignupIn,
    tasks: BackgroundTasks,
    auth_svc: AuthService = Depends(get_auth_service),
):
    return await auth_svc.signup(
        name=payload.name,
        email=payload.email,
        password=payload.password,
        tasks=tasks,
    )


@router.post("/verify-email", status_code=status.HTTP_200_OK)
async def verify_email(
    payload: VerifyEmailPayload,
    tasks: BackgroundTasks,
    response: Response,
    auth_svc: AuthService = Depends(get_auth_service),
):
    return await auth_svc.verify_email_token(payload.token, tasks, response)


@router.post("/request-password-reset", status_code=status.HTTP_200_OK)
async def request_password_reset(
    payload: PasswordResetRequest,
    tasks: BackgroundTasks,
    auth_svc: AuthService = Depends(get_auth_service),
):
    return await auth_svc.request_password_reset(payload.email, tasks)


@router.post("/reset-password", status_code=status.HTTP_200_OK)
async def reset_password(
    payload: PasswordResetInput,
    tasks: BackgroundTasks,
    auth_svc: AuthService = Depends(get_auth_service),
):
    return await auth_svc.reset_password(payload.token, payload.new_password, tasks)


@router.post("/login", status_code=status.HTTP_200_OK)
async def login(
    payload: SigninIn,
    response: Response,
    auth_svc: AuthService = Depends(get_auth_service),
):
    return await auth_svc.signin(payload.email, payload.password, response)


@router.post("/logout", status_code=status.HTTP_200_OK)
def logout(response: Response):
    response.delete_cookie(key="access_token")
    return MessageResponse(message="Logout successful.")


@router.get("/me", response_model=UserOut, status_code=status.HTTP_200_OK)
async def get_me(current_user: UserOut = Depends(get_current_user)):
    return current_user
