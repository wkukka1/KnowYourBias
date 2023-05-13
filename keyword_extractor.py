import json
import requests

def get_keywords(text):
    """
    >>> get_keywords("The purpose of the text is a test")
    """
    headers = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiODAxNjgzMTMtNGQ0Zi00ZWRhLWJjMjItYzIyYjczNzBmYjVlIiwidHlwZSI6ImFwaV90b2tlbiJ9.3wC9m2B31J3o94hB4hZBcEmvFEh5SlJKbUaK3hBb0lw"}

    url = "https://api.edenai.run/v2/text/keyword_extraction"
    payload = {"providers": "amazon", "language": "en", "text": text}

    response = requests.post(url, json=payload, headers=headers)

    result = json.loads(response.text)
    words = ""
    counter = 0
    for item in result["amazon"]["items"]:
        words += item["keyword"] + ' || '
        counter += 1
        if counter >= 10:
            break
    return words[:len(words) - 4]  # cuts off the last 4 characters of words (which is ' || ')
