import os, json, zipfile
from git import repo
import pandas as pd
from flask import Response, request
from random import randint

dataset_dir = os.path.dirname(__file__) + "\\dataset\\"
if (not os.path.exists(dataset_dir) or not os.path.exists(dataset_dir + "archive.zip")):
    repo.clone_from("https://github.com/werrio5/sudoku-dataset", dataset_dir) 

zf = zipfile.ZipFile(dataset_dir + "archive.zip") 
df = pd.read_csv(zf.open('sudoku.csv'))

def getField():
    params = request.json
    index = params.index if params.index else randint(0, 999998)
    return Response(
        response=json.dumps({ 'grid' : getTrainRecord(i)}),
        status=http.HTTPStatus.OK,
        mimetype='application/json'
    )

def getTrainRecord(i):
    data = df[i : i + 1]
    return [data["quizzes"][0], data["solutions"][0]]