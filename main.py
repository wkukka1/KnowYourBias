from BiasCalculator import predict_p
import requests
from bs4 import BeautifulSoup
from keyword_extractor import get_keywords
from newscatcherapi import NewsCatcherApiClient
import re


def remove_chars(s):
    chars_to_remove = ['[', ']', '/', '\\', '%5B', '%5D', '%2F', '%5C', ':', '%3A', '^', '%5E']
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
            return (predict_p(text), get_keywords(text))
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
