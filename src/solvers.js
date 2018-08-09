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
// const zeroRowCol = (row, col, n, matrix)=>{
//   for(let i = 0; i < n; i++){
//     matrix[row][i] = 0;
//     matrix[i][col] = 0;
//   }
// };

// const zeroMajorDiags = (row, col, n, matrix)=>{
//   // move to left or top of matrix & calc length
//   let magicNumber;
//   if (row <= col) {
//     col -= row;
//     row -= row;
//     magicNumber = n - col;
//   } else if (row > col) {
//     row -= col;
//     col -= col;
//     magicNumber = n - row;
//   }
//   // add zeros
//   for(let i = 0; i < magicNumber; i++){
//     matrix[row][col] = 0;
//     row = (row + 1);
//     col = (col + 1);
//   }
// };

// const zeroMinorDiags = function(row,col,n,matrix) {
//   // move to top or right of matrix
//   let magicNumber;
//   let tempNum = row + col;
//   let tempNum2 = tempNum - (n - 1);
//   row = tempNum2;
//   col = n - 1;
//   if(row < 0){
//     col += row;
//     row -= row;
//   }
//   // calc length
//   magicNumber = col - row + 1;
//   // add zeros
//   for(let i = 0; i < magicNumber; i++) {
//     matrix[row][col] = 0; 
//     row = (row + 1) % n;
//     col = (col - 1);
//     if (col < 0) {
//       col = col + n;
//     }
    
//   }
// }  

window.findNRooksSolution = function(n) {
  let inputMatrix = [];
  for(let i = 0; i < n; i++){
    inputMatrix.push([]);
  }
  for(let row = 0; row < n; row++){
    for(let col = 0; col < n; col++){
      if(inputMatrix[row][col] === undefined){
        inputMatrix[row][col] = 1;
        for(let i = col + 1; i < n; i++){
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
window.countNRooksSolutions = function(n) {
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
window.findNQueensSolution = function(n) {
  let solution = undefined;

  
  for(let i = 0; i < n; i++){
    for(let j = 0; j < n; j++){
      let newBoard = new window.Board({n:n});
      solution = newBoard.mikesFunction(n, [i,j]);
      if(solution !== undefined){
        return solution;
      }
    }
  }
  
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  let solution;
  
  
  
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solution;
};

