paintBoard();
paintNumberPanel();
generatePuzzle(DIFFICULTY.EASY);

/*paint sudoku board*/
function paintBoard() {
    var board = document.getElementById("board");
    for (var i = 0; i < DIMENSION; i++) {
        var row = document.createElement("TR");
        row.setAttribute("id", "row" + i);
        board.appendChild(row);
        for (var j = 0; j < DIMENSION; j++) {
            var cell = document.createElement("TD");
            cell.setAttribute("id", getId(i,j));
            var textNode = document.createTextNode("0");
            if ((i + 1) % ROOT == 0) {
                cell.className = "gap-bottom";
            } else {
                cell.className = "board";
            }
            if ((j + 1) % ROOT == 0) {
                cell.className="gap-right";
            }
            if ((i + 1) % ROOT == 0 && (j + 1) % ROOT == 0) {
                cell.className="gap-double";
            }
            cell.appendChild(textNode);
            document.getElementById("row" + i).appendChild(cell);
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
        button.innerHTML = (num).toString();
        cell.appendChild(button);
        document.getElementById("number").appendChild(cell);
    }
}
