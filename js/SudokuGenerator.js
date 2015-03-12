"use strict";
generateBoard();
generateNumbers();
generatePuzzle();
function generateBoard() {
    var board = document.getElementById("board");
    for (var i = 0; i < DIMENSION; i++) {
        var row = document.createElement("TR");
        row.setAttribute("id", "row" + i);
        document.getElementById("board").appendChild(row);
        for (var j = 0; j < DIMENSION; j++) {
            var cell = document.createElement("TD");
            cell.setAttribute("id", (i*DIMENSION + j).toString());
            var textNode = document.createTextNode(j.toString());
            if (i%ROOT == 2) {
                cell.className = "gap-bottom";
            } else {
                cell.className = "board";
            }
            if (j%ROOT==2) {
                cell.className="gap-right";
            }
            if (i%ROOT ==2 && j%ROOT==2) {
                cell.className="gap-double";
            }
            cell.appendChild(textNode);
            document.getElementById("row" + i).appendChild(cell);
        }
    }
}

function generateNumbers() {
    var panel = document.getElementById("numbers");
        var row = document.createElement("TR");
        row.setAttribute("id", "number");
        document.getElementById("numbers").appendChild(row);
        for (var i = 0; i < DIMENSION; i++) {
            var cell = document.createElement("TD");
            cell.className = "number";
            var button = document.createElement("BUTTON");
            button.innerHTML = (i+1).toString();
            cell.appendChild(button);
            document.getElementById("number").appendChild(cell);
        }
}


function generatePuzzle() {
    var boardBack = createBoard();
    for (var i = 0; i < DIMENSION; i++) {
        for (var j = 0; j<DIMENSION; j++) {
            document.getElementById((i*DIMENSION+j).toString()).innerHTML = boardBack[i][j].value;
        }
    }
}






