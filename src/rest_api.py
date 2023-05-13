from flask import Flask, request
from flask_restful import Api, Resource, abort
import BiasCalculator, keyword_extractor, main

app = Flask(__name__)
api = Api(app)

articles = {}

def abort_if_article_does_not_exist(url):
    if url not in articles:
        abort(404, message="The article has not been analyzed yet. Please send a put request first and try later.")


class KnowYourBiasAPI(Resource):
    def get(self):
        url = request.args.get('url')
        abort_if_article_does_not_exist(url)
        return articles[url]

    def put(self):
        url = request.args.get('url')
        bias_and_keywords = main.search_by_url(url, True)
        opposing_articles = main.get_articles(bias_and_keywords[0], bias_and_keywords[1])
        articles[url] = {'article bias': bias_and_keywords[0], 'opposing articles': opposing_articles}
        return articles[url], 201

    def delete(self):
        url = request.args.get('url')
        abort_if_article_does_not_exist(url)
        del articles[url]
        return '', 204


api.add_resource(KnowYourBiasAPI, "/knowyourbiasapi/<"url": string>")


if __name__ == "__main__":
    app.run(debug=True)
