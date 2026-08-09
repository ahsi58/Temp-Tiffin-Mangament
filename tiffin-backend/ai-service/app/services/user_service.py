import os

import httpx
from dotenv import load_dotenv

load_dotenv()

USER_SERVICE_URL = os.getenv("USER_SERVICE_URL")


class UserService:

    def get_my_profile(self, access_token: str):

        url = f"{USER_SERVICE_URL}/users/me"

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


user_service = UserService()

# if __name__ == "__main__":

#     access_token = "u-H7MyuiloZ1LqYHDEH0j6l0"

#     result = user_service.get_my_profile(
#         access_token
#     )

#     print(result)