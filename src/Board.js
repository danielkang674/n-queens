// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function () {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function (rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
             _             _     _
         ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
        / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
        \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
        |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)
    
     */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function (rowIndex) {
      let inputMatrix = this.rows();
      let counter = 0;

      for (let i = 0; i < inputMatrix[rowIndex].length; i++) {
        counter += inputMatrix[rowIndex][i];
      }
      return counter > 1 ? true : false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function () {
      let inputMatrix = this.rows();
      for (let i = 0; i < inputMatrix.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function (colIndex) {
      let inputMatrix = this.rows();
      let counter = 0;

      for (let i = 0; i < inputMatrix.length; i++) {
        counter += inputMatrix[i][colIndex];
        if (counter > 1) {
          return true;
        }
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function () {
      let inputMatrix = this.rows();
      for (let i = 0; i < inputMatrix.length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function (majorDiagonalColumnIndexAtFirstRow) {
      let inputMatrix = this.rows();
      let counter1 = 0;
      let counter2 = 0;

      for (let i = 0; i < inputMatrix.length - majorDiagonalColumnIndexAtFirstRow; i++) {
        counter1 += inputMatrix[i][i + majorDiagonalColumnIndexAtFirstRow];
        counter2 += inputMatrix[majorDiagonalColumnIndexAtFirstRow + i][i];
        if (counter1 > 1 || counter2 > 1) {
          return true;
        }
      }
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function () {
      let inputMatrix = this.rows();
      for (let i = 0; i < inputMatrix.length; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict

    hasMinorDiagonalConflictAt: function (minorDiagonalColumnIndexAtFirstRow) {
      let inputMatrix = this.rows();
      let counter1 = 0;
      let counter2 = 0;
      let lengthCrazy = inputMatrix.length - minorDiagonalColumnIndexAtFirstRow - 1;
      let minor = minorDiagonalColumnIndexAtFirstRow;

      for (let i = 0; i < lengthCrazy + 1; i++) {
        counter1 += inputMatrix[i][lengthCrazy - i]; //1st pass : 0,1 2nd pass: 1,0
        counter2 += inputMatrix[i + minor][lengthCrazy + minor - i]; //1st pass : 2,3 2nd pass: 3,2
        if (counter1 > 1 || counter2 > 1) {
          return true;
        }
      }
      return false; // fixme
    },

    //MINOR = 2
    //lengthCrazy = 1

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function () {
      let inputMatrix = this.rows();
      for (let i = 0; i < inputMatrix.length; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },

    mikesFunction: function (n, coordPair) {
      let newBoard = new window.Board(this.rows().slice());
      let solution = undefined;
      let qCounter = 0;
      let outerRow = coordPair[0];
      let outerCol = coordPair[1];
      let row = (outerRow + k) % n;
      let col = (outerCol + l) % n;
      let space = newBoard.rows()[row][col];
      if (space === 0) {
        newBoard.zeroRowCol(row, col, n, newBoard.rows());
        newBoard.zeroMajorDiags(row, col, n, newBoard.rows());
        newBoard.zeroMinorDiags(row, col, n, newBoard.rows());
        newBoard[row][col] = 1;
        qCounter++;
      }
      console.log(newBoard);
      let arrayOfZeros = [];
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (newBoard.rows()[i][j] === 0) {
            arrayOfZeros.push([i, j]);
          }
        }
      }
      for (let k = 0; k < n; k++) {
        newBoard.mikesFunction(n, arrayOfZeros[k]);
      }
      if (qCounter >= n) {
        solution = newBoard;
      }
      return solution;
    },

    zeroRowCol: (row, col, n, matrix) => {
      for (let i = 0; i < n; i++) {
        matrix[row][i] = 2;
        matrix[i][col] = 2;
      }
    },

    zeroMajorDiags: (row, col, n, matrix) => {
      // move to left or top of matrix & calc length
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
    },

    zeroMinorDiags: function (row, col, n, matrix) {
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
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  let makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };

}());
