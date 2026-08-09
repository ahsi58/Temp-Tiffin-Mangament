from langchain_core.tools import tool

from app.services.user_service import user_service


def create_user_tools(access_token: str):

    @tool
    def get_my_profile() -> str:
        """
        Get the profile of the currently logged-in customer.

        Use this tool when the customer asks about their own
        profile, name, email, phone number, or account details.
        """

        result = user_service.get_my_profile(
            access_token
        )


        return str(result)

    return [get_my_profile]