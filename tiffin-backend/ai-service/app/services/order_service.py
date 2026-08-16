import os

import httpx
from dotenv import load_dotenv

load_dotenv()

ORDER_SERVICE_URL = os.getenv("ORDER_SERVICE_URL")


class OrderService:

    def get_my_orders(self, access_token: str):

        url = f"{ORDER_SERVICE_URL}/orders/history"

        headers = {
            "Authorization": access_token
        }

        response = httpx.get(
            url,
            headers=headers,
            timeout=10.0
        )

        response.raise_for_status()

        return response.json()

    def get_order_by_id(self, order_id: int, access_token: str):

        url = f"{ORDER_SERVICE_URL}/orders/{order_id}"

        headers = {
            "Authorization": access_token
        }

        response = httpx.get(
            url,
            headers=headers,
            timeout=10.0
        )

        response.raise_for_status()

        return response.json()

    def get_all_orders(self, access_token: str):

        url = f"{ORDER_SERVICE_URL}/orders/all"

        headers = {
            "Authorization": access_token
        }

        response = httpx.get(
            url,
            headers=headers,
            timeout=10.0
        )

        response.raise_for_status()

        return response.json()


order_service = OrderService()