import http
import json

from flask import Response, request
from random import randint, shuffle
from math import sqrt

default_size = 9

def generate():  
  params = request.json
  return Response(
    response=json.dumps({ 'grid' : _generate(params.get('size'))}),
    status=http.HTTPStatus.OK,
    mimetype='application/json'
  )

#Sudoku Generator Algorithm - www.101computing.net/sudoku-generator-algorithm/
def _generate(size):
  #initialise empty N by N grid
  grid = _emptyGrid(size if size else default_size)
  fillGrid(grid)
  reduce(grid)
  return grid

def _emptyGrid(size: int):
  grid = []
  for row in range(size):
    grid.append([0] * size)
  return grid

#A function to check if the grid is full
def checkGrid(grid: list):
  for row in range(0, len(grid)):
    if lineContainsNumber(row, 0): return False
  #We have a complete grid!  
  return True 

#A backtracking/recursive function to check all possible combinations of numbers until a solution is found
def solveGrid(grid: list):
  global counter
  size = len(grid)  
  numberList = [range(1, size + 1)]
  #Find next empty cell
  for i in range(0, size ** 2):
    row = i // size
    col = i % size
    if grid[row][col] == 0:
      for value in numberList:
        if not (
          lineContainsNumber(grid[row], value) or
          columnContainsNumber(grid, col, value) or 
          squareContainsNumber(grid, row, col)
        ):
          grid[row][col] = value
          if checkGrid(grid):
            counter += 1
            break
          else:
            if solveGrid(grid):
              return True
      break

#shuffle(numberList)

#A backtracking/recursive function to check all possible combinations of numbers until a solution is found
def fillGrid(grid: list):
  global counter
  size = len(grid)
  numberList = [range(1, size + 1)]
  #Find next empty cell
  for i in range(0, size ** 2):
    row=i // size
    col=i % size
    if grid[row][col] == 0:
      shuffle(numberList)      
      for value in numberList:
        if not (
          lineContainsNumber(grid[row], value) or
          columnContainsNumber(grid, col, value) or 
          squareContainsNumber(grid, row, col)
        ):
          grid[row][col] = value
          if checkGrid(grid): return True
          else: 
            if fillGrid(grid): return True
      break   

def lineContainsNumber(line: list, number: int):
  return number in line

def columnContainsNumber(grid: list, column: int, number: int):
  for row in grid:
    if row[column] == number: return True
  return False

def squareContainsNumber(grid: list, num_i: int, num_j: int):
  number = grid[num_i][num_j]
  squares_count = int(sqrt(len(grid)))
  square_i = num_i // squares_count
  square_j = num_j // squares_count
  rows = range(squares_count * square_i, squares_count * (square_i + 1) - 1)
  columnMin = squares_count * square_j
  columnMax = squares_count * (square_j + 1)
  for row in rows:
    if lineContainsNumber(grid[row][columnMin:columnMax], number): return True
  return False

def reduce(grid: list):
  #A higher number of attempts will end up removing more numbers from the grid
  #Potentially resulting in more difficiult grids to solve!
  attempts = 5 
  counter = 1
  size = len(grid)
  numberList = [range(0, size)]
  while attempts > 0:
    #Select a random cell that is not already empty
    row = randint(0, size - 1)
    col = randint(0, size - 1)
    while grid[row][col] == 0:
      row = randint(0, size - 1)
      col = randint(0, size - 1)
    #Remember its cell value in case we need to put it back  
    backup = grid[row][col]
    grid[row][col] = 0
    
    #Take a full copy of the grid
    copyGrid = []
    for r in range(0, size):
      copyGrid.append([])
      for c in range(0, size):
          copyGrid[r].append(grid[r][c])
    
    #Count the number of solutions that this grid has (using a backtracking approach implemented in the solveGrid() function)
    counter = 0      
    solveGrid(copyGrid)   
    #If the number of solution is different from 1 then we need to cancel the change by putting the value we took away back in the grid
    if counter != 1:
      grid[row][col] = backup
      #We could stop here, but we can also have another attempt with a different cell just to try to remove more numbers
      attempts -= 1

'''    
#Generate a Fully Solved Grid
fillGrid(grid)
drawGrid(grid) 
myPen.getscreen().update()
sleep(1)


#Start Removing Numbers one by one

#A higher number of attempts will end up removing more numbers from the grid
#Potentially resulting in more difficiult grids to solve!
attempts = 5 
counter=1
while attempts>0:
  #Select a random cell that is not already empty
  row = randint(0,8)
  col = randint(0,8)
  while grid[row][col]==0:
    row = randint(0,8)
    col = randint(0,8)
  #Remember its cell value in case we need to put it back  
  backup = grid[row][col]
  grid[row][col]=0
  
  #Take a full copy of the grid
  copyGrid = []
  for r in range(0,9):
     copyGrid.append([])
     for c in range(0,9):
        copyGrid[r].append(grid[r][c])
  
  #Count the number of solutions that this grid has (using a backtracking approach implemented in the solveGrid() function)
  counter=0      
  solveGrid(copyGrid)   
  #If the number of solution is different from 1 then we need to cancel the change by putting the value we took away back in the grid
  if counter!=1:
    grid[row][col]=backup
    #We could stop here, but we can also have another attempt with a different cell just to try to remove more numbers
    attempts -= 1
'''
