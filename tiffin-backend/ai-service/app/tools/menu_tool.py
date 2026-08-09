from datetime import datetime

from langchain_core.tools import tool

from app.services.menu_service import menu_service


@tool
def get_today_menu() -> dict:
    """
    Get today's lunch and dinner menu.
    Use this tool when the user asks about today's menu or today's meals.
    """

    today = datetime.now().strftime("%A").upper()

    result = menu_service.get_menu_by_day(today)

    print(result)

    return str(result)

def get_weekly_menu() -> dict:
    """
    Get weekly menu.
    Use this tool when the user asks for entire week menu.
    """

    result = menu_service.get_week_menu()
    print(result)
    return str(result)
