function Cell() {
    this.row = -1;
    this.column = -1;
    this.value = -1;
    this.possibleVals = [];
}



Cell.prototype.init_1 = function (row, column) {
    this.row = row;
    this.column = column;
    this.value = 0;
    this.possibleVals = [1,2,3,4,5,6,7,8,9];
    return this;
};

Cell.prototype.init_2 = function (copy) {
    this.row = copy.row;
    this.column = copy.column;
    this.value = copy.value;
    this.possibleVals = copyArray(copy.possibleVals);
    return this;
};







