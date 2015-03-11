/**
 * Created by mengyan on 3/8/15.
 */
var ROWS = 9;
var COLUMNS = 9;



function createBoard() {
    var board = createArray(ROWS, COLUMNS);
    for (var i=0; i<ROWS; i++) {
        for (var j=0; j<COLUMNS; j++) {
            board[i][j] = new Cell().init_1(i,j);
        }
    }
    board = populateBoard(board);
    return board;
}

function createBoardCopy(board) {
    var boardCpy = createArray(ROWS, COLUMNS);
    for (var i=0; i<ROWS; i++) {
        for (var j=0; j<COLUMNS; j++) {
            boardCpy[i][j] = new Cell().init_2(board[i][j]);
        }
    }
    return boardCpy;
}

function populateBoard(board) {
    var boardIn = createBoardCopy(board);
    var emptyCell = findEmptyCell(boardIn);
    if(emptyCell == null) {
        return boardIn;
    }
    var ret = null;
    while (ret == null) {
        var len = emptyCell.possibleVals.length;
        if (len == 0) {
            break;
        }
        var index = randomFrom(len);
        emptyCell.value = emptyCell.possibleVals[index];
        if (!findConflict(emptyCell, boardIn)) {
            ret = populateBoard(boardIn);
        }
        if (ret == null) {
            emptyCell.possibleVals.splice(index,1);
            emptyCell.value = 0;
        }
    }
    return ret;

}

function findEmptyCell(board) {
    var theCell = null;
    var count = 10;
    for (var i = 0; i <ROWS; i++) {
        for (var j =0; j<COLUMNS; j++) {
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

function findConflict(cell, board) {
    //conflict in row
    for (var i = 0; i < COLUMNS; i++) {
        if (cell.column != i) {
            if (cell.value == board[cell.row][i].value) {
                return true;
            }
        }
    }
    //conflict in column
    for (var i = 0; i < ROWS; i++) {
        if (cell.row != i) {
            if (cell.value == board[i][cell.column].value) {
                return true;
            }
        }
    }
    //conflict in block
    var blockRow = Math.floor(cell.row/3);
    var blockColumn = Math.floor(cell.column/3);
    for (var i = 0; i<3; i++) {
        for (var j = 0; j<3; j++) {
            var ii = i + blockRow * 3;
            var jj = j + blockColumn * 3;
            if (cell.row != ii || cell.column != jj) {
                if (cell.value == board[ii][jj].value) {
                    return true;
                }
            }
        }
    }
    return false;
}

function updatePossibleValues(cell, board) {
    //update in row
    for (var i = 0; i < COLUMNS; i++) {
        if (cell.column != i) {
            if (board[cell.row][i].value == 0) {
                board[cell.row][i].possibleVals.filter(function(element) {
                    return element == cell.value;
                });
            }
        }
    }
    //update in column
    for (var i = 0; i < ROWS; i++) {
        if (cell.row != i) {
            if (board[i][cell.column].value == 0) {
                board[i][cell.column].possibleVals.filter(function(element) {
                    return element == cell.value;
                })
            }
        }
    }
    //update in block
    var blockRow = Math.floor(cell.row/3);
    var blockColumn = Math.floor(cell.column/3);
    for (var i = 0; i<3; i++) {
        for (var j = 0; j<3; j++) {
            var ii = i + blockRow * 3;
            var jj = j + blockColumn * 3;
            if (cell.row != ii || cell.column != jj) {
                if (board[ii][jj].value == 0) {
                    board[ii][jj].possibleVals.filter(function(element) {
                        return element == cell.value;
                    })
                }
            }
        }
    }
}

