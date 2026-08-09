from fastapi import APIRouter, Depends

from fastapi.security import HTTPAuthorizationCredentials

from app.chatbot.chatbot import chatbot
from app.models.request import ChatRequest
from app.models.response import ChatResponse
from app.core.security import bearer_scheme


router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


@router.post("", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    credentials: HTTPAuthorizationCredentials = Depends(
        bearer_scheme
    )
):

    access_token = (
        f"{credentials.scheme} {credentials.credentials}"
    )

    reply = chatbot.get_response(
        request.message,
        access_token
    )

    return ChatResponse(
        reply=reply
    )