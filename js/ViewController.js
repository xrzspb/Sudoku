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

		var playing = $('#playing');

		var width = window.innerWidth
		|| document.documentElement.clientWidth
		|| document.body.clientWidth;
		var height = window.innerHeight
		|| document.documentElement.clientHeight
		|| document.body.clientHeight;
		height = Math.min(height,width);
		width = Math.min(height,width);
	
		var left = (window.innerWidth - width)/2;
		var top = (window.innerHeight - height)/2;
		playing.css({
			'height':height,
			'width':width,
			'left':left,
			'top': top
		});

    });

	$( window ).resize(function() {
		var playing = $('#playing');
		var width = window.innerWidth
		|| document.documentElement.clientWidth
		|| document.body.clientWidth;
		var height = window.innerHeight
		|| document.documentElement.clientHeight
		|| document.body.clientHeight;
		height = Math.min(height,width);
		width = Math.min(height,width);

		var left = (window.innerWidth - width)/2;
		var top = (window.innerHeight - height)/2;
		playing.css({
			'height':height,
			'width':width,
			'left':left,
			'top': top
		});

	});

    $("#board TR TD TABLE TR TD").click(function() {
        selectedCell = null;
        cleanBoard();
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
            highlight(val, row, col);
        }
    });

    $("#number TD BUTTON").click(function() {
        var input = parseInt($(this).parent().text());
        actionOnInput(input);
    });

    $(document).on('keypress', function(e) {
        var input = event.which || event.keyCode;
        if (input< 49 || input >57) {
            return;
        }
        input = input - 48;
        actionOnInput(input);

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

function actionOnInput(input) {
    if (selectedCell != null) {
        selectedCell.value = input;
        if (hasConflict(selectedCell, sudokuBoard)) {
            selectedCell.value = 0;
            $('#' + getIdByRowCol(selectedCell.row, selectedCell.column)).addClass('warning');
        } else {
            cleanBoard();
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
                highlight(input.toString(), selectedCell.row, selectedCell.column);
            }
        }
    }
}
function cleanBoard() {
    all_td.removeClass('selected');
    all_td.removeClass('highlighted');
    all_td.removeClass('warning');
}

function openPopup() {
    var gameOverDialog = $('#gameOverDialog');
    gameOverDialog.fadeIn();
    updatePopup();
}
function updatePopup() {
    var popup = $('#gameOverDialog');
    var top = ($('#playing').height() - $('#gameOverDialog').height())/2;
    var left = ($('#playing').width() - $('#gameOverDialog').width())/2;
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

function highlight(val, row, column) {
    var list = findCellsWithSameNumber(parseInt(val), sudokuBoard);
    for (var i = 0; i < list.length; i++)  {
        var cell = list[i];
        if (cell.row != row || cell.column != column) {
            $("#board #" + getIdByRowCol(cell.row, cell.column)).addClass('highlighted');
        }
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
