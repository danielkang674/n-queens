/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function (n) {
  let inputMatrix = [];
  for (let i = 0; i < n; i++) {
    inputMatrix.push([]);
  }
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (inputMatrix[row][col] === undefined) {
        inputMatrix[row][col] = 1;
        for (let i = col + 1; i < n; i++) {
          inputMatrix[row][i] = 0;
          inputMatrix[i][col] = 0;
        }
      }
    }
  }
  var solution = inputMatrix; //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var factorial = 1;
  var startingN = n;
  for (var i = 0; i < n; i++) {
    factorial = factorial * startingN;
    startingN--;
  }


  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return factorial;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  let solution = undefined;
  let newBoard = window.makeEmptyMatrix(n);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (solution !== undefined) {
        return solution;
      }
      let filledBoard = window.decisionTree(newBoard, n, [i, j]);
      if (window.checkForSolution(filledBoard, n)) {
        let normalBoard = window.normalizeBoard(filledBoard);
        console.log(filledBoard, normalBoard);
        solution = normalBoard;
      }
    }
  }
  return solution || newBoard;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  // if (n === 0 || n===1) {
  //   return 1;
  // }
  // if(n===2||n===3){
  //   return 0;
  // }


  let solutionCount = new Set();

  let newBoard = window.makeEmptyMatrix(n);

  let inner = function (board, n, coordArr) {
    let splitBoard = window.splitBoard(board, n, coordArr);
    let possibleCoordsArr = window.getPossibleCoordsArr(splitBoard);
    if (window.checkForSolution(splitBoard, n)) {
      solutionCount.add(JSON.stringify(splitBoard));
    }
    if (possibleCoordsArr.length > 0) {
      for (let i = 0; i < possibleCoordsArr.length; i++) {
        inner(splitBoard, n, possibleCoordsArr[i]);
      }
    }
    // return splitBoard;
  };


  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {

      inner(newBoard, n, [i, j]);
    }
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount.size);

  return solutionCount.size;
};

window.decisionTree = function (board, n, coordArr) {
  let splitBoard = window.splitBoard(board, n, coordArr);
  let possibleCoordsArr = window.getPossibleCoordsArr(splitBoard);
  if (possibleCoordsArr.length > 0) {
    for (let i = 0; i < possibleCoordsArr.length; i++) {
      let childBoard = window.decisionTree(splitBoard, n, possibleCoordsArr[i]);
      if (window.checkForSolution(childBoard, n)) {
        splitBoard = childBoard;
      }
    }
  }
  return splitBoard;
};

window.normalizeBoard = function (board) {
  let normalBoard = window.copyMatrix(board);
  for (let i = 0; i < normalBoard.length; i++) {
    for (let j = 0; j < normalBoard.length; j++) {
      if (normalBoard[i][j] === 2) {
        normalBoard[i][j] = 0;
      }
    }
  }
  return normalBoard;
};

window.splitBoard = function (board, n, coordArr) {
  let newBoard = window.copyMatrix(board);
  let row = coordArr[0];
  let col = coordArr[1];
  if (newBoard[row][col] === 0) {
    window.zeroRowCol(newBoard, n, row, col);
    window.zeroMajorDiags(newBoard, n, row, col);
    window.zeroMinorDiags(newBoard, n, row, col);
    newBoard[row][col] = 1;
  }
  return newBoard;
};

window.getPossibleCoordsArr = function (board) {
  let possibleCoordsArr = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === 0) {
        possibleCoordsArr.push([i, j]);
      }
    }
  }
  return possibleCoordsArr;
};

window.checkForSolution = function (board, n) {
  let counter = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === 1) {
        counter++;
      }
    }
  }
  return counter >= n;
};

window.copyMatrix = function (board) {
  let newArr = [];
  for (let i = 0; i < board.length; i++) {
    let tempRow = board[i].slice();
    newArr.push(tempRow);
  }
  return newArr;
};

window.zeroRowCol = function (matrix, n, row, col) {
  for (let i = 0; i < n; i++) {
    matrix[row][i] = 2;
    matrix[i][col] = 2;
  }
};

window.zeroMajorDiags = function (matrix, n, row, col) {
  let magicNumber;
  if (row <= col) {
    col -= row;
    row -= row;
    magicNumber = n - col;
  } else if (row > col) {
    row -= col;
    col -= col;
    magicNumber = n - row;
  }
  // add zeros
  for (let i = 0; i < magicNumber; i++) {
    matrix[row][col] = 2;
    row = (row + 1);
    col = (col + 1);
  }
};

window.zeroMinorDiags = function (matrix, n, row, col) {
  // move to top or right of matrix
  let magicNumber;
  let tempNum = row + col;
  let tempNum2 = tempNum - (n - 1);
  row = tempNum2;
  col = n - 1;
  if (row < 0) {
    col += row;
    row -= row;
  }
  // calc length
  magicNumber = col - row + 1;
  // add zeros
  for (let i = 0; i < magicNumber; i++) {
    matrix[row][col] = 2;
    row = (row + 1) % n;
    col = (col - 1);
    if (col < 0) {
      col = col + n;
    }
  }
};

window.makeEmptyMatrix = function (n) {
  return _(_.range(n)).map(function () {
    return _(_.range(n)).map(function () {
      return 0;
    });
  });
};