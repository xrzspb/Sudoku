/**
 * Created by mengyan on 3/8/15.
 */

/*create copy of board, used for backtrace*/
function createBoardCopy(board) {
    var boardCpy = createArray(DIMENSION, DIMENSION);
    for (var i=0; i<DIMENSION; i++) {
        for (var j=0; j<DIMENSION; j++) {
            boardCpy[i][j] = new Cell().initCopy(board[i][j]);
        }
    }
    return boardCpy;
}

/*
*used to populate a board and solve a puzzle. logic is as following:
*find an empty cell with least number of possible values.
*   if there is no empty cell,
*       the board is fully filled, done!
*   else
*      update it's possible values
*      if no possible values
*           oops, no solution, return!
*      else
*           randomly choose a possible value, fill the cell and solve the sub-problem
*           if failed
*               remove the possible value, try another until success or running out of possible values
*          else
                done!
*/
function solvePuzzle(board) {
    var boardIn = createBoardCopy(board);
    var emptyCell = findEmptyCell(boardIn);
    if(emptyCell == null) {
        return boardIn;
    }
    emptyCell.possibleVals = updatePossibleValues(emptyCell, board);
    var ret = null;
    while (ret == null) {
        var len = emptyCell.possibleVals.length;
        if (len == 0) {
            break;
        }
        var index = randomInRange(len);
        emptyCell.value = emptyCell.possibleVals[index];
        ret = solvePuzzle(boardIn);
        if (ret == null) {
            emptyCell.possibleVals.splice(index,1);
            emptyCell.value = 0;
        }
    }
    
    return ret;
}

/*helper function, find the empty cell with least number of possible values.*/
function findEmptyCell(board) {
    var theCell = null;
    var count = DIMENSION + 1;
    for (var i = 0; i <DIMENSION; i++) {
        for (var j =0; j<DIMENSION; j++) {
            var cell = board[i][j];
            if (cell.value == 0) {
                if (count > cell.possibleVals.length) {
                    count = cell.possibleVals.length;
                    theCell = cell;
                }
            }
        }
    }
    return theCell;
}

/*update possible values based on the current existing cells in board */
function updatePossibleValues(cell, board) {
    var update = [];
    var existing = [];
    //update based on row
    for (var i = 0; i < DIMENSION; i++) {
        if (board[cell.row][i].value != 0) {
            existing.push(board[cell.row][i].value);
        }
    }
    //update in column
    for (var i = 0; i < DIMENSION; i++) {
        if (board[i][cell.column].value != 0) {
            existing.push(board[i][cell.column].value);
        }
    }
    //update in block
    var blockRow = Math.floor(cell.row/ROOT);
    var blockColumn = Math.floor(cell.column/ROOT);
    for (var i = 0; i<ROOT; i++) {
        for (var j = 0; j < ROOT; j++) {
            var ii = i + blockRow * ROOT;
            var jj = j + blockColumn * ROOT;
            if (board[ii][jj].value != 0) {
                existing.push(board[ii][jj].value);
            }
        }
    }
    for (var i =1; i<= DIMENSION; i++) {
        if ($.inArray(i, existing) == -1) {
            update.push(i);
        }
    }
    return update;
}

function hasConflict(cell, board) {
    //check in row
    for (var i = 0; i < DIMENSION; i++) {
        if (i!=cell.column && board[cell.row][i].value == cell.value) {
            return true;
        }
    }
    //check in column
    for (var i = 0; i < DIMENSION; i++) {
        if (i!=cell.row && board[i][cell.column].value == cell.value) {
            return true;
        }
    }
    //check in block
    var blockRow = Math.floor(cell.row/ROOT);
    var blockColumn = Math.floor(cell.column/ROOT);
    for (var i = 0; i<ROOT; i++) {
        for (var j = 0; j < ROOT; j++) {
            var ii = i + blockRow * ROOT;
            var jj = j + blockColumn * ROOT;
            if ((ii!=cell.row || jj!=cell.column) && board[ii][jj].value == cell.value) {
                return true;
            }
        }
    }
}

function findCellsWithSameNumber(value, board) {
    var list = [];
    for (var i = 0; i<DIMENSION; i++) {
        for (var j = 0; j<DIMENSION; j++) {
            if (board[i][j].value == value) {
                list.push(board[i][j]);
            }
        }
    }
    return list;
}

function gameOver(board) {
    return findEmptyCell(board) == null;
}