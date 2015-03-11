/**
 * Created by mengyan on 3/9/15.
 */


function createArray(rows, columns) {
    var x = new Array(rows);
    for (var i = 0; i < rows; i++) {
        x[i] = new Array(columns);
    }
    return x;
}

function createNumberArray(rows) {
    var x = new Array(rows);
    for (var i = 0; i<rows; i++) {
        x[i] = i+1;
    }
    return x;
}

function randomFrom(num) {
    return Math.floor(Math.random()*num);
}

function copyArray(array) {
    return array.slice(0);
}