from crm.gemini_service import model
import json

def build_campaign_strategy(goal):

    prompt = f"""
    You are Athena, an AI marketing strategist for a bookstore CRM.

    Goal:
    {goal}

    Generate:

    1. segment
    2. reasoning
    3. channel
    4. message

    Return ONLY valid JSON.

    Example:

    {{
        "segment": "Fantasy Readers",
        "reasoning": "Customers who frequently purchase fantasy books.",
        "channel": "EMAIL",
        "message": "Discover your next fantasy adventure."
    }}
    """

    response = model.generate_content(prompt)

    clean_text = response.text.strip()

    if clean_text.startswith("```json"):
        clean_text = clean_text.replace(
            "```json",
            ""
        )

    if clean_text.endswith("```"):
        clean_text = clean_text[:-3]

    return json.loads(clean_text.strip())
