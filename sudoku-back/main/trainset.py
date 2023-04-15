import os
import zipfile
from git import Repo
import pandas as pd

dataset_dir = os.path.dirname(__file__) + "\\dataset\\"
if (not os.path.exists(dataset_dir) or not os.path.exists(dataset_dir + "archive.zip")):
    Repo.clone_from("https://github.com/werrio5/sudoku-dataset", dataset_dir)

zf = zipfile.ZipFile(dataset_dir + "archive.zip")
df = pd.read_csv(zf.open('sudoku.csv'))


def getTrainRecord(i):
    data = df[i: i + 1]
    return [data["quizzes"][0], data["solutions"][0]]

def getTrainset():
    return df;
