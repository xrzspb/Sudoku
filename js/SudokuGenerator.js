/*create board data and populate the board*/
var sudokuBoard = null;
function createBoard(difficulty) {
    var board = createArray(DIMENSION, DIMENSION);
    for (var i=0; i<DIMENSION; i++) {
        for (var j=0; j<DIMENSION; j++) {
            board[i][j] = new Cell().init(i,j);
        }
    }
    board = solvePuzzle(board);
    var holesMade = 0;
    while(holesMade < difficulty){
        var row = randomInRange(DIMENSION);
        var col = randomInRange(DIMENSION);
        if(board[row][col].value != 0){
            board[row][col].value = 0;
            holesMade++;
        }
    }
    return board;
}

/*fill up the html table with board data*/
function generatePuzzle(difficulty) {
    sudokuBoard = createBoard(difficulty);
    for (var i = 0; i < DIMENSION; i++) {
        for (var j = 0; j<DIMENSION; j++) {
            if(sudokuBoard[i][j].value != 0){
                document.getElementById((i*DIMENSION+j).toString()).innerHTML = sudokuBoard[i][j].value;
            } 
            else {
                document.getElementById((i*DIMENSION+j).toString()).innerHTML = null;
            }
        }
    }
}
