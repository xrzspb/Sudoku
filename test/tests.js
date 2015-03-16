QUnit.test("id converter", function( assert ) {
    assert.equal(getIdByRowCol(5, 5), 50);

    assert.equal(getId(1,1,2,3), 51);

    assert.equal(getRowFromId(30), 3);

    assert.equal(getColumnFromId(30), 3);

});
QUnit.test("find empty cell", function( assert ) {
    var board = createEmptyBoard();
    board[0][0].value = 1;
    board[0][1].possibleVals = [2,3,4,5,6,7,8,9];
    var emptyCell = findEmptyCell(board);
    assert.equal(emptyCell.row, 0);
    assert.equal(emptyCell.column, 1);
});



QUnit.test("update possible values", function( assert ) {
    var board = createEmptyBoard();
    board[0][0].value = 1;
    board[0][1].value = 2;
    board[0][2].value = 3;
    board[0][3].value = 4;
    board[0][4].value = 5;
    board[0][5].value = 6;
    board[0][6].value = 7;
    board[0][7].value = 8;
    board[0][8].possibleVals = updatePossibleValues(board[0][8], board);
    assert.equal(board[0][8].possibleVals.length, 1);
    assert.equal(board[0][8].possibleVals[0], 9);
});


QUnit.test("find cells with same names", function( assert ) {
    var board = createEmptyBoard();
    board[0][0].value = 1;
    board[1][2].value = 1;
    board[2][3].value = 1;
    board[3][4].value = 1;
    var cells = findCellsWithSameNumber(1, board);
    var array = [];
    for (var i = 0; i < cells.length; i++) {
        array.push(getIdByRowCol(cells[i].row, cells[i].column));
    }
    assert.equal(arrayEqual(array, [0, 11, 21, 31]), true);
});


QUnit.test("find conflicts", function( assert ) {
    var board = createEmptyBoard();
    board[0][0].value = 1;
    board[0][2].value = 1;
    assert.equal(hasConflict(board[0][0], board), true);
});

function arrayEqual(array1, array2) {
    if (array1.length == array2.length) {
        for (i = 0; i < array1.length; i++) {
            if (array1[i] != array2[i]) {
                return false;
            }
        }
        return true;
    }
    return false;
}






