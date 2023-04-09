import http
import json

from flask import Flask, Response

from main.generator import generate

app = Flask(__name__)

@app.route("/", methods=['GET'])
def helloworld():
    return Response(
      response=json.dumps({ 'message' : 'hello world!'}),
      status=http.HTTPStatus.OK,
      mimetype='application/json'
   )

app.add_url_rule('/generate', methods = ['GET', 'POST'], view_func = generate)

if __name__ == '__main__':
    app.run()