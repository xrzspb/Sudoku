/*create board data and populate the board*/
function createBoard(difficulty) {
    var board = createArray(DIMENSION, DIMENSION);
    for (var i=0; i<DIMENSION; i++) {
        for (var j=0; j<DIMENSION; j++) {
            board[i][j] = new Cell().init(i,j);
        }
    }
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
            document.getElementById(getIdByRowCol(i, j)).style.fontSize = '1.5em';
            document.getElementById(getIdByRowCol(i, j)).style.color = '#ffffff';
            if(sudokuBoard[i][j].value != 0){
                console.log(i + ":" + j + " : " + sudokuBoard[i][j].value + " : " + getIdByRowCol(i, j));
                sudokuBoard[i][j].isPreset = true;
                document.getElementById(getIdByRowCol(i, j)).innerHTML = sudokuBoard[i][j].value;
                document.getElementById(getIdByRowCol(i, j)).style.fontSize = '1em';
            }
        }
    }
    return sudokuBoard;
}
