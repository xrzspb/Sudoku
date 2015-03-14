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

//create an array from 1 to rows+1
function createNumberArray(rows) {
    var x = new Array(rows);
    for (var i = 0; i<rows; i++) {
        x[i] = i+1;
    }
    return x;
}

//generate random number from 0 to num
function randomInRange(num) {
    return Math.floor(Math.random()*num);
}

function copyArray(array) {
    return array.slice(0);
}

function isStrEmpty(str) {
    return (!str || !str.length);
}

function getId(row, column) {
    return (row*DIMENSION + column).toString();
}