/**
 * Created by mengyan on 3/14/15.
 */
var selectedCell = null;
var all_td = $('td');
$(document).ready(function(){
    paintBoard();
    paintNumberPanel();
    $('#start').click(function () {
        changeView($(this), $('#difficulty'));
    });

    $('.difficulty').click(function () {
        var difficulty = null;
        console.log(this.id);
        switch (this.id) {
            case '1' :
                difficulty = DIFFICULTY.EASY;
                break;
            case '2' :
                difficulty = DIFFICULTY.MEDIUM;
                break;
            case '3' :
                difficulty = DIFFICULTY.HARD;
                break;
            default :
                difficulty = DIFFICULTY.EASY;
        }
        generatePuzzle(difficulty);
        changeView($(this), $('#playing'));
    });


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
    var top = ($('table.outerTable').outerHeight() - $('#gameOverDialog').height())/2;
    var left = ($('table.outerTable').outerWidth() - $('#gameOverDialog').width())/2;
    console.log(top + ":" + left);
    popup.css({
        'top': top,
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

function changeView(hide, show) {
    hide.css({
        'display': 'none'
    });
    show.css({
        'display': 'block'
    });
}
