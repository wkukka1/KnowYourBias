from BiasCalculator import preprocess
import requests
from bs4 import BeautifulSoup
import json
import requests
from newscatcherapi import NewsCatcherApiClient
import re
import joblib
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer

def remove_chars(s):
    chars_to_remove = ['[', ']', '/', '\\', '%5B', '%5D', '%2F', '%5C', ':', '%3A', '^', '%5E', '\"', '\'', '.', ',',"\'"]
    pattern = '|'.join(re.escape(char) for char in chars_to_remove)
    return re.sub(pattern, '', s)


def search_by_url(url, getkeywords):
    """
    Takes in a url and returns the political bias of the article

    # >>> search_by_url("https://www.foxnews.com/politics/house-step-gutting-bidens-400-billion-student-loan-handout")
    # 'right'

    >>> test = search_by_url("https://www.foxnews.com/politics/house-step-gutting-bidens-400-billion-student-loan-handout", True)
    >>> print(test)
    # >>> get_articles(test[0], test[1])
    # >>> print(search_by_url("https://www.cnn.com/2023/05/12/us/title-42-expires-border-immigration-friday/index.html", False))
    """
    response = requests.get(url)
    content = response.content

    x = BeautifulSoup(content, "html.parser")

    article = x.find_all("p")
    text = ""
    if len(article) > 0:
        for div in article:
            line = div.text.strip()
            if "©" not in line and "™" not in line:
                text = text + line
        if getkeywords:
            return [predict_p(text), get_keywords(text)]
        else:
            return predict_p(text)
    else:
        return "Article Not Found"


def get_articles(bias: str, keywords: str):
    """This function uses keywords to find articles that have an opposite bias than the one given
    The elemenets in the list returned are in the form of (bias of article, article object)
    Preconditions:
        - bias in {'left', 'right', 'center', 'center-left'}

    >>> get_articles('left', "tens of thousands || migrants || northern Mexico || the expiration || the US Covid-era border restriction policy || Title 42")
    #Should return right wing articles about immigration
    """
    # ['[', ']', '/', '\\\\', '%5B', '%5D', '%2F', '%5C', ':', '%3A', '^', '%5E']
    keywords = remove_chars(keywords)
    newscatcherapi = NewsCatcherApiClient(x_api_key='xrSsa0l72CxRUipZ4Vi2ofbW7nZh3p9pPbtqPKLKPLk')

    obj = newscatcherapi.get_search(q=keywords,
                                    lang='en',
                                    page_size=100)
    if "articles" not in obj:
        return ["No articles found"]
    article_list = obj['articles']

    filtered_list = []
    for article in article_list:
        article_bias = search_by_url(article['link'], False)
        if article_bias == "Article Not Found":
            article_bias = predict_p(article["summary"])
        if article_bias != bias and article_bias != "center-" + bias:
            filtered_list.append([article_bias, article["title"], article["link"], article["media"]])
        if len(filtered_list) == 4:
            break

    return filtered_list

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
    print(words)
    return words[:len(words) - 4]  # cuts off the last 4 characters of words (which is ' || ')

def predict_p(input_text) -> str:
    """
    Returns anything in {'left', 'right', 'center', 'center-left'}

    >>> predict_p("The Black Lives Matter movement started a massive wave of Americans uniting to call for defunding the police and eradicating white supremacy to make positive changes for Black Americans. But experts reflecting on the movement’s scorecard in 2022 say Black America hasn’t benefited.I would argue that, on balance, these communities are worse off because by [BLM] overemphasizing the role of police, they've changed police behavior for the worse,the Manhattan Institute’s Jason Riley told Fox News Digital in a phone interview. In other words, police do become more cautious. They're less likely to get out of their cars and engage with people in the community. And to the extent that police are less proactive, the criminals have the run of the place.")
    """
    # Load the saved vectorizer and model from files
    loaded_vectorizer = joblib.load('vectorizer.joblib')
    loaded_model = joblib.load('random_forest_model.joblib')

    # Preprocess the input text
    processed_text = preprocess(input_text)

    # Convert the preprocessed text to a matrix of token counts using the loaded vectorizer
    processed_text_counts = loaded_vectorizer.transform([processed_text])

    tf_transformer = TfidfTransformer(use_idf=False).fit(processed_text_counts)
    processed_text_tf = tf_transformer.transform(processed_text_counts)
    # Use the loaded model to make predictions on the preprocessed input text
    prediction = loaded_model.predict(processed_text_tf)[0]

    return prediction