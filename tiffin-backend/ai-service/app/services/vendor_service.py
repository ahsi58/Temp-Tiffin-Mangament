import os

import httpx
from dotenv import load_dotenv

load_dotenv()

VENDOR_SERVICE_URL = os.getenv("VENDOR_SERVICE_URL")


class VendorService:

    def get_my_profile(self, access_token: str):

        url = f"{VENDOR_SERVICE_URL}/vendors/me"

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


vendor_service = VendorService()