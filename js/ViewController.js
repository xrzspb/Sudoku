/**
 * Created by mengyan on 3/14/15.
 */
var selectedCell = null;
var all_td = $('td');
$(document).ready(function(){
    $("#board TD").click(function() {
        selectedCell = null;
        all_td.removeClass('selected');
        all_td.removeClass('highlighted');
        $(this).addClass('selected');
        var col = parseInt($(this).index());
        var row = parseInt($(this).parent().index());
        console.log(row + ":" + col);
        var val = getTDText(row,col);
        if (isStrEmpty(val)) {
            selectedCell = new Cell().init(row, col);
        } else {
            //show other same number
            highlight(val);
        }
    });


    $("#number TD BUTTON").click(function() {
        var input = parseInt($(this).parent().text());
        if (selectedCell != null) {
            selectedCell.value = input;
            if (hasConflict(selectedCell, sudokuBoard)) {
                selectedCell.value = 0;
                console.log("shake");
                //shake the cell
            } else {
                //populate the data model
                sudokuBoard[selectedCell.row][selectedCell.column] = selectedCell;
                //popluate the gui
                setTDText(input.toString(), selectedCell.row, selectedCell.column);
                //check if game is over
                if (gameOver(sudokuBoard)) {
                    //TODO: if end, make animation in the board and have another layer to display.
                    //give user a choice to return to main page, or restart

                } else {
                    highlight(input.toString());
                }
            }
        }
    });
});

function getTDText(row, column) {
    return document.getElementById(getId(row,column)).innerHTML;
}

function setTDText(text, row, column) {
    document.getElementById(getId(row,column)).innerHTML = text;
}

function highlight(val) {
    var list = findCellsWithSameNumber(parseInt(val), sudokuBoard);
    for (var i = 0; i < list.length; i++)  {
        var cell = list[i];
        $("#board #" + getId(cell.row,cell.column)).addClass('highlighted');
    }
}
