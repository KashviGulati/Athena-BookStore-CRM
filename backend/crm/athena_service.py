from crm.gemini_service import model
import json

def build_campaign_strategy(goal, crm_context):

    prompt = f"""
        You are Athena, an AI marketing strategist for a bookstore CRM.

        CRM Data:

        {crm_context}

        Goal:

        {goal}

        IMPORTANT:

        IMPORTANT:

        When selecting a segment, you MUST choose one of the personas
        present in the CRM data exactly as written.

        Do not rename personas.
        Do not create new personas.
        Do not invent audience names.

        The segment field must contain an existing persona name.

        Do not invent customer segments.

        Generate:

        1. segment
        2. reasoning
        3. channel
        4. message

        Return ONLY valid JSON.

        Example:

        {{
            "segment": "Fantasy Fiction Fan",
            "reasoning": "Customers already interested in fantasy books.",
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
