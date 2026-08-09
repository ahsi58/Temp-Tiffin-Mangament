from typing import Any


def extract_text(content: Any) -> str:
    """
    Extract plain text from LangChain AIMessage.content.

    Supports both:
    - str
    - list[{"type":"text","text":"..."}]
    """

    if isinstance(content, str):
        return content

    if isinstance(content, list):
        texts = []

        for item in content:
            if isinstance(item, dict) and item.get("type") == "text":
                texts.append(item.get("text", ""))

        return "".join(texts)

    return str(content)