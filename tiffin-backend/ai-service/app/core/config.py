from dotenv import load_dotenv
import os

load_dotenv()


class Settings:
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")
    MODEL_NAME = os.getenv("MODEL_NAME")

    MENU_SERVICE_URL = os.getenv("MENU_SERVICE_URL")
    ORDER_SERVICE_URL = os.getenv("ORDER_SERVICE_URL")
    USER_SERVICE_URL = os.getenv("USER_SERVICE_URL")


settings = Settings()