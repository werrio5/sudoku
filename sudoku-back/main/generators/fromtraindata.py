from ..trainset import getTrainRecord

import http
import json
from flask import request, Response
from random import randint


def getField():
    params = request.json
    index = params.index if params.index else randint(0, 999998)
    return Response(
        response=json.dumps({'grid': getTrainRecord(index)}),
        status=http.HTTPStatus.OK,
        mimetype='application/json'
    )
