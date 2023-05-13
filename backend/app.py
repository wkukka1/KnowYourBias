from flask import Flask
from main import search_by_url, get_articles, get_keywords, predict_p

app = Flask(__name__)

@app.route('/url/<url>', methods = ["POST"])
def getArticlesByUrl(url:str):
    articlebias = search_by_url(url)
    otherArticles = get_articles(articlebias[0], articlebias[1])
    return {"bias":articlebias[0], "opposingArticles": otherArticles}

@app.route("/p/<p>", methods = ["POST"])
def get_articles_by_p(p:str):
    article_bias = predict_p(p)
    otherArticles = get_articles(article_bias, get_keywords(p))
    return {"bias": article_bias, "opposingArticles": otherArticles}
    

if __name__ == "__main__":
   app.run(debug=True)