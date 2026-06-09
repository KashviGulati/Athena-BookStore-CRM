import os
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
    1. Persona Name
    2. Persona Description

    Return JSON only.

    Example:

    {{
        "persona_name":"Fantasy Explorer",
        "description":"Frequently purchases fantasy novels."
    }}
    """

    response = model.generate_content(prompt)

    return response.text