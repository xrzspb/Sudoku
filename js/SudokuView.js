paintBoard();
paintNumberPanel();
generatePuzzle(DIFFICULTY.EASY);

/*paint sudoku board*/
function paintBoard() {
    var board = document.getElementById("board");
    board.className = 'outerTable';
    for (var i = 0; i < ROOT; i++) {
        var row  = document.createElement("TR");
        board.appendChild(row);
        for (var j = 0; j < ROOT; j++) {
            var cell = document.createElement("TD");
            row.appendChild(cell);
            var innerTable = document.createElement("TABLE");
            innerTable.className = 'innerTable';
            cell.appendChild(innerTable);
            for (var m = 0; m < ROOT; m++) {
                var innerRow = document.createElement("TR");
                innerTable.appendChild(innerRow);
                for (var n = 0; n < ROOT; n++) {
                    var innerCell = document.createElement("TD");
                    innerCell.className = 'board';
                    innerRow.appendChild(innerCell);
                    innerCell.setAttribute("id", getId(i, j, m, n));
                    innerCell.innerHTML = '0';
                }
            }
        }
    }
}
/*paint number input panel, this is particular useful for mobile device*/
function paintNumberPanel() {
    var panel = document.getElementById("numbers");
    var row = document.createElement("TR");
    row.setAttribute("id", "number");
    document.getElementById("numbers").appendChild(row);
    for (var num = 1; num <= DIMENSION; num++) {
        var cell = document.createElement("TD");
        cell.className = "number";
        var button = document.createElement("BUTTON");
        button.className = "numbers";
        button.innerHTML = (num).toString();
        cell.appendChild(button);
        document.getElementById("number").appendChild(cell);
    }
}
