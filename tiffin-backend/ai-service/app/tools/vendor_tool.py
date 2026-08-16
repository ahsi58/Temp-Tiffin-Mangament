from langchain_core.tools import tool

from app.services.vendor_service import vendor_service


def create_vendor_tools(access_token: str):

    @tool
    def get_vendor_profile() -> str:
        """
        Get the profile of the currently logged-in vendor.

        Use this tool when the vendor asks about:
        - their profile
        - vendor information
        - their name
        - their contact information
        - their account details
        """

        result = vendor_service.get_my_profile(
            access_token
        )

        return str(result)

    return [
        get_vendor_profile
    ]