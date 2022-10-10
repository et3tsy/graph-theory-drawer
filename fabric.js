function fabricInit() {
    // get the object from canvas by name
    fabric.Canvas.prototype.getObjectByName = function (name) {
        var object = null,
            objects = this.getObjects();

        for (var i = 0, len = this.size(); i < len; i++) {
            if (objects[i].name && objects[i].name === name) {
                object = objects[i];
                break;
            }
        }
        return object;
    };

    // to remove line references when the line gets removed
    fabric.Canvas.prototype.removeLine = function (line) {
        var objects = this.getObjects();
        objects.forEach((vertex) => {
            if (vertex.type === 'circle') {
                vertex.to.forEach((item, idx) => {
                    if (item === line) {
                        vertex.to.splice(idx, 1);
                    }
                })
                vertex.from.forEach((item, idx) => {
                    if (item === line) {
                        vertex.from.splice(idx, 1);
                    }
                })
            }
        });
    }
}