from langchain_groq import ChatGroq

from app.core.config import settings


chat_model = ChatGroq(
    model=settings.MODEL_NAME,
    temperature=0,
    api_key=settings.GROQ_API_KEY
)