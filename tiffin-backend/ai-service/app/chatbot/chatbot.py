from pathlib import Path

from langchain.agents import create_agent

from app.clients.gemini_client import chat_model
from app.tools.menu_tool import get_today_menu, get_weekly_menu
from app.tools.user_tool import create_user_tools
from app.utils.response_parser import extract_text


PROMPT_PATH = Path(__file__).parent.parent / "prompts" / "system_prompt.txt"

with open(PROMPT_PATH, "r", encoding="utf-8") as file:
    SYSTEM_PROMPT = file.read()


class Chatbot:

    def get_response(
        self,
        message: str,
        access_token: str
    ) -> str:

        # Create tools specific to the logged-in user
        user_tools = create_user_tools(access_token)

        # Combine common tools with user-specific tools
        tools = [
            get_today_menu,
            get_weekly_menu,
            *user_tools
        ]

        # Create agent for this request
        agent = create_agent(
            model=chat_model,
            tools=tools,
            system_prompt=SYSTEM_PROMPT
        )

        result = agent.invoke(
            {
                "messages": [
                    {
                        "role": "user",
                        "content": message
                    }
                ]
            }
        )

        # print(result)

        final_message = result["messages"][-1]

        return extract_text(final_message.content)


chatbot = Chatbot()