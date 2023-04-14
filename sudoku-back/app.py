import http
import json

from flask import Flask, Response
from main import router

app = Flask(__name__)
router.init(app)


@app.route("/", methods=['GET'])
def helloworld():
    return Response(
        response=json.dumps({'message': 'hello world!'}),
        status=http.HTTPStatus.OK,
        mimetype='application/json'
    )


if __name__ == '__main__':
    app.run()
