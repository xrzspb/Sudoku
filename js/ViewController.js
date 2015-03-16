/**
 * Created by mengyan on 3/14/15.
 */
var selectedCell = null;
var sudokuBoard = null;
var diff = null;
var all_td = $('td');
$(document).ready(function(){
    $('#start').click(function () {
        changeView($('#start'), $('#difficulty'));
    });

    $('.difficulty').click(function () {
        var difficulty = null;
        switch (this.id) {
            case 'easy':
                difficulty = DIFFICULTY.EASY;
                break;
            case 'medium':
                difficulty = DIFFICULTY.MEDIUM;
                break;
            case 'hard':
                difficulty = DIFFICULTY.HARD;
                break;
            default :
                difficulty = DIFFICULTY.EASY;
        }
        changeView($('#difficulty'), $('#playing'));
        diff = difficulty;
        sudokuBoard = generatePuzzle(difficulty);
    });


    $("#board TR TD TABLE TR TD").click(function() {
        selectedCell = null;
        all_td.removeClass('selected');
        all_td.removeClass('highlighted');
        all_td.removeClass('warning');
        $(this).addClass('selected');
        var id = this.id;
        var row = getRowFromId(id);
        var col = getColumnFromId(id);
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
                $('#'+getIdByRowCol(selectedCell.row, selectedCell.column)).addClass('warning');
            } else {
                all_td.removeClass('selected');
                all_td.removeClass('highlighted');
                all_td.removeClass('warning');

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
    $('#restart').click(function() {
        var gameOverDialog = $('#gameOverDialog');
        gameOverDialog.fadeOut();
        selectedCell = null;
        sudokuBoard = generatePuzzle(diff);
    });

    $('#return').click(function() {
        selectedCell = null;
        sudokuBoard = null;
        var gameOverDialog = $('#gameOverDialog');
        gameOverDialog.fadeOut();
        changeView($('#playing'), $('#start'));
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
