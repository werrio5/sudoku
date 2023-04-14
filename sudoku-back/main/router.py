from .generators import generator, fromtraindata

import json
import http
from flask import Response


def init(app):
    app.add_url_rule('/api', methods=['GET'], view_func=getRestMap)

    app.add_url_rule(
        '/generate', methods=['GET', 'POST'], view_func=generator.generate)
    app.add_url_rule(
        '/stub', methods=['GET', 'POST'], view_func=generator.stub)
    app.add_url_rule(
        '/trainset', methods=['GET', 'POST'], view_func=fromtraindata.getField)


def getRestMap():
    return Response(
        response=json.dumps({
            "generators":
            [
                ["/generate", [4, 9, 16, 25]],
                ["/stub", [9]],
                ["/trainset", [9]]
            ]
        }),
        status=http.HTTPStatus.OK,
        mimetype='application/json'
    )
