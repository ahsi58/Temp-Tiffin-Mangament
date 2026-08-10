import os

import httpx
from dotenv import load_dotenv

load_dotenv()

MENU_SERVICE_URL = os.getenv("MENU_SERVICE_URL")


class MenuService:

    #service 1
    def get_menu_by_day(self, day: str):

        url = f"{MENU_SERVICE_URL}/menus/{day}"
        print("Menu url: ",url)

        response = httpx.get(
            url,
            timeout=10.0
        )

        response.raise_for_status()

        return response.json()

    #service 2
    def get_week_menu(self):
        url = f"{MENU_SERVICE_URL}/menus"
        print(url)

        response = httpx.get(
            url,
            timeout = 10.0
        )

        response.raise_for_status()
        return response.json()

menu_service = MenuService()