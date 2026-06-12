import os
import json
import google.generativeai as genai

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


def generate_persona(customer_summary):

    prompt = f"""
        Analyze this bookstore customer.

        Customer Data:
        {customer_summary}

        Generate:

        1. persona_name
        2. description

        IMPORTANT:

        The persona must be based on the customer's
        actual purchase genres.

        Use consistent persona names.

        Examples:

        Fantasy Reader
        Mystery Reader
        History Reader
        Finance Reader
        Productivity Reader
        Self Help Reader

        If the customer regularly purchases
        multiple genres, combine them.

        Examples:

        Fantasy & Mystery Reader
        History & Finance Reader
        Fantasy & Self Help Reader

        Do not invent creative names.

        Do NOT use names like:

        Epic Fantasy Collector
        Fantasy Explorer
        Book Enthusiast
        Avid Reader
        Literary Adventurer

        The persona_name must clearly reflect
        the customer's genres.

        Return ONLY valid JSON.

        Do not use markdown.
        Do not use ```json.
        Do not add explanations.

        Example:

        {{
        "persona_name": "Fantasy Reader",
        "description": "Frequently purchases fantasy books."
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