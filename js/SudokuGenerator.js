"use strict";
generateBoard();
generateNumbers();
generatePuzzle();
function generateBoard() {
    var rows = 9,
        cols = 9;
    var board = document.getElementById("board");
    for (var i = 0; i < rows; i++) {
        var y = document.createElement("TR");
        y.setAttribute("id", "row" + i);
        document.getElementById("board").appendChild(y);
        for (var j = 0; j < rows; j++) {
            var z = document.createElement("TD");
            z.setAttribute("id", (i*10 + j).toString());
            var t = document.createTextNode(j);
            if (i%3 == 2) {
                z.className = "gap-bottom";
            } else {
                z.className = "board";
            }
            if (j%3==2) {
                z.className="gap-right";
            }
            if (i%3 ==2 && j%3==2) {
                z.className="gap-double";
            }
            z.appendChild(t);
            document.getElementById("row" + i).appendChild(z);
        }
    }
}

function generateNumbers() {
    var counts = 9;
    var panel = document.getElementById("numbers")
        var y = document.createElement("TR");
        y.setAttribute("id", "number");
        document.getElementById("numbers").appendChild(y);
        for (var i = 0; i < counts; i++) {
            var z = document.createElement("TD");
            z.className = "number";
            var t = document.createElement("BUTTON");
            t.innerHTML = i+1;
            z.appendChild(t);
            document.getElementById("number").appendChild(z);
        }
}


function generatePuzzle() {
    var boardBack = createBoard();
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j<9; j++) {
            document.getElementById((i*10+j).toString()).innerHTML = boardBack[i][j].value;
        }
    }
}






