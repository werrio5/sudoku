import os
from git import repo
import pandas as pd
import zipfile

dataset_dir = os.path.dirname(__file__) + "\\dataset\\"
if (not os.path.exists(dataset_dir) or not os.path.exists(dataset_dir + "archive.zip")):
    repo.clone_from("https://github.com/werrio5/sudoku-dataset", dataset_dir) 

zf = zipfile.ZipFile(dataset_dir + "archive.zip") 
df = pd.read_csv(zf.open('sudoku.csv'))

print(df.head(5))