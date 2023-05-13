from flask import Flask, render_template, request
from main import search_by_url, get_articles, get_keywords, predict_p

app = Flask(__name__)

@app.route('/')
def home_page():
    return render_template('index.html')

@app.route('/url', methods = ["POST", "GET"])
def getArticlesByUrl():
    url = request.form.get("article-url")
    print(url)
    articlebias = search_by_url(url, True)
    otherArticles = get_articles(articlebias[0], articlebias[1])
    return {"bias":articlebias[0], "opposingArticles": otherArticles}

@app.route("/p", methods = ["POST"])
def get_articles_by_p():
    p = request.form["article-contents"]
    article_bias = predict_p(p)
    otherArticles = get_articles(article_bias, get_keywords(p))
    return {"bias": article_bias, "opposingArticles": otherArticles}
    

if __name__ == "__main__":
   app.run(debug=True)
