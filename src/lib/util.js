// helpers

Array.prototype.remove = function (element) {
    let i = this.indexOf(element);
    if (i > -1) this.splice(i, 1);
    return this;
};
