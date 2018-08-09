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



window.findNRooksSolution = function(n) {
  let inputMatrix = [];
  for(let i = 0; i < n; i++){
    inputMatrix.push([]);
  }
  // let amIOne = true;
  // let counter = 0;
  // for(let row = 0; row < n; row++){
  //   let tempRow = [];
  //   for(let col = 0; col < n; col++){
  //     if(amIOne && i === counter){
  //       tempRow.push(1);
  //       amIOne = false;
  //       counter++;
  //     } else {
  //       tempRow.push(0);
  //     }
  //   }
  //   inputMatrix.push(tempRow);
  //   amIOne = true;
  // }
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

  
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n,coordPair) {
  let inputMatrix = [];
  for(let i = 0; i < n; i++){
    inputMatrix.push([]);
  }
  let start = coordPair ? coordPair : [0,0]; // if provided with start cool, otherwise 0,0
  
  //all loops (row, length, row0,col0,mjdiag0,mndiag0) must have modulo functionality
  //declare queen counter as 0
  //set row & col to coordPair or 0,0 if none provided
  
  //for row; vs length of n; row++ ----- do we have a problem here where we need to run four times 
  //                                     but we might start our loop at row (from coordPair)? I 
  //                                     you solved problem but I don't remember.                                        

    // for col; vs length of n; col++ ----- see comment 4 lines up

      // if coordPair = undefined

        // increment number of queens
        
        // call row zeroing function
          // loop over entire row (even if some points/cells are 'behind' you) using modulo
          // if hit 1
            // break current loop as producing invalid solution
          // if hit 0 or undefined write them to 0
        
        // call column zeroing function
          // loop over entire row (even if some points/cells are 'behind' you) using modulo
          // if hit 1
            // break current loop as producing invalid solution
          // if hit 0 or undefined write them to 0
        
        // call major diagonal zeroing function
          // loop over entire row (even if some points/cells are 'behind' you) using modulo
          // if hit 1
            // break current loop as producing invalid solution
          // if hit 0 or undefined write them to 0
        
        // call minor diagonal zeroing function
          // loop over entire row (even if some points/cells are 'behind' you) using modulo
          // if hit 1
            // break current loop as producing invalid solution
          // if hit 0 or undefined write them to 0
        
        // set coordPair from 0 (because of zeroing functions) to 1 (queen)
      
      //end of 'if coordPair = undefined'
    
    //end of 'for col loop'
  
  //end of 'for row loop'
  
  //if queen counter is >= n
    // ideally (for countNQueensSolutions) also save/return the starting coordinates that resulted
      // in this solution so you can start on them + 1 for finding next solution
    // return board as a valid solution for board of n
  //else
    // return false (no viable solutions for board of n)
  
  
  
  
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme
  
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

  // var inputMatrix = [];
  // for (var row = 0; row < n; row++) {
  //   for (var col = 0; col < n; col++) {
  //     inputMatrix = [];
  //     for(let i = 0; i < n; i++){
  //       inputMatrix.push([]);
  //     }
      
  //   }
  // }