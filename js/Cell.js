function Cell() {
    this.row = -1;
    this.column = -1;
    this.value = -1;
    this.possibleVals = [];
}
Cell.prototype.init = function (row, column) {
    this.row = row;
    this.column = column;
    this.value = 0;
    this.possibleVals = createNumberArray(DIMENSION);
    return this;
};

Cell.prototype.initCopy = function (copy) {
    this.row = copy.row;
    this.column = copy.column;
    this.value = copy.value;
    this.possibleVals = copyArray(copy.possibleVals);
    return this;
};







