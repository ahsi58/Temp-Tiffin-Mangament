from langchain_core.tools import tool

from app.services.order_service import order_service


def create_order_tools(access_token: str):

    @tool
    def get_my_orders() -> str:
        """
        Get the order history of the currently logged-in customer.

        Use this tool when a customer asks about:
        - their orders
        - previous orders
        - order history
        - orders they placed
        """

        result = order_service.get_my_orders(access_token)

        return str(result)

    @tool
    def get_order_by_id(order_id: int) -> str:
        """
        Get details of a specific order using its order ID.

        Use this tool when the user asks about a particular order
        and provides an order ID.
        """

        result = order_service.get_order_by_id(
            order_id,
            access_token
        )

        return str(result)

    @tool
    def get_all_orders() -> str:
        """
        Get all customer orders.

        Use this tool ONLY when the logged-in user is a vendor
        asking about customer orders.
        """

        result = order_service.get_all_orders(access_token)

        return str(result)

    return [
        get_my_orders,
        get_order_by_id,
        get_all_orders
    ]