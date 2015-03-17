/*create empty board*/
function createEmptyBoard() {
    var board = createArray(DIMENSION, DIMENSION);
    for (var i=0; i<DIMENSION; i++) {
        for (var j=0; j<DIMENSION; j++) {
            board[i][j] = new Cell().init(i,j);
        }
    }
    return board;
}

/*populate the board*/
function createBoard(difficulty) {
    var board = createEmptyBoard();
    board = solvePuzzle(board);
    var holesMade = 0;
    while(holesMade < difficulty) {
        var row = randomInRange(DIMENSION);
        var col = randomInRange(DIMENSION);
        if (board[row][col].value != 0) {
            board[row][col].value = 0;
            holesMade++;
        }
    }
    return board;
}

/*fill up the html table with board data*/
function generatePuzzle(difficulty) {
    var sudokuBoard = createBoard(difficulty);
    for (var i = 0; i < DIMENSION; i++) {
        for (var j = 0; j<DIMENSION; j++) {
            document.getElementById(getIdByRowCol(i, j)).innerHTML = null;
            document.getElementById(getIdByRowCol(i, j)).style.color = '#ffffff';
            document.getElementById(getIdByRowCol(i, j)).style.fontWeight = 'bold';
            if(sudokuBoard[i][j].value != 0){
                sudokuBoard[i][j].isPreset = true;
                document.getElementById(getIdByRowCol(i, j)).innerHTML = sudokuBoard[i][j].value;
                document.getElementById(getIdByRowCol(i, j)).style.fontWeight = 'inherit';
            }
        }
    }
    return sudokuBoard;
}
