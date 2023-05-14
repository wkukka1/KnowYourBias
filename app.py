from flask import Flask, render_template, request, jsonify
from main import search_by_url, get_articles, get_keywords, predict_p

app = Flask(__name__)

@app.route('/')
def home_page():
    return render_template('index.html')

@app.route('/articleurl/<path:url>', methods = ["POST"])
def getArticlesByUrl(url):
    articlebias = search_by_url(url, True)
    otherArticles = get_articles(articlebias[0], articlebias[1])
    print({"bias":articlebias[0], "opposingArticles": otherArticles})
    return jsonify({"bias":articlebias[0], "opposingArticles": otherArticles})
    # return jsonify(bias=articlebias[0], opposingArticles=otherArticles)

@app.route("/p/<string:p>", methods = ["POST"])
def get_articles_by_p(p):
    article_bias = predict_p(p)
    print(article_bias)
    otherArticles = get_articles(article_bias, get_keywords(p))
    return jsonify({"bias": article_bias, "opposingArticles": otherArticles})
    # return jsonify(bias=article_bias[0], opposingArticles=otherArticles)
    

if __name__ == "__main__":
   app.run(debug=True)
