/**
 * Created by mengyan on 3/14/15.
 */
var selectedCell = null;
var all_td = $('td');
$(document).ready(function(){
    $("#board TR TD TABLE TR TD").click(function() {
        selectedCell = null;
        all_td.removeClass('selected');
        all_td.removeClass('highlighted');
        $(this).addClass('selected');
        var id = this.id;
        var row = getRowFromId(id);
        var col = getColumnFromId(id);
        console.log(row + ":" + col + " : " + id);
        var val = getTDText(id);
        if(!sudokuBoard[row][col].isPreset){
            selectedCell = new Cell().init(row, col);
        }
        if (!isStrEmpty(val)) {
            //show other same numbesrs
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
                all_td.removeClass('selected');
                all_td.removeClass('highlighted');
                //populate the data model
                sudokuBoard[selectedCell.row][selectedCell.column] = selectedCell;
                //popluate the gui
                setTDText(input.toString(), selectedCell.row, selectedCell.column);
                //check if game is over
                if (gameOver(sudokuBoard)) {
                    //TODO: if end, make animation in the board and have another layer to display.
                    //give user a choice to return to main page, or restart
                    openPopup();
                } else {
                    highlight(input.toString());
                }
            }
        }
    });
});

function openPopup() {
    var gameOverDialog = $('#gameOverDialog');
    gameOverDialog.fadeIn();
    updatePopup();
}
function updatePopup() {
    var popup = $('#gameOverDialog');
    var offsets = $('div.center').offset();
    var top = $(window).height()/2;
    var left = ($(document).width() - $('div.center').outerWidth()*3)/2;
    console.log(top + ":" + left);
    popup.css({
        'top': 100,
        'left':left
    });
}

function getTDText(id) {
    return document.getElementById(id).innerHTML;
}

function setTDText(text, row, column) {
    document.getElementById(getIdByRowCol(row,column)).innerHTML = text;
}

function highlight(val) {
    var list = findCellsWithSameNumber(parseInt(val), sudokuBoard);
    for (var i = 0; i < list.length; i++)  {
        var cell = list[i];
        $("#board #" + getIdByRowCol(cell.row,cell.column)).addClass('highlighted');
    }
}
