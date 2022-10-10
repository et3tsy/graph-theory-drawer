function linkInit() {
    // initial link mode
    $("#link").click(function () {
        canvas.discardActiveObject();
    });

    // linking two vertexs, when the first one is chosen,
    // activate the FocusLine
    canvas.on('mouse:up', function (e) {
        if (document.getElementById("link").checked != true || e.target === null) {
            return;
        }

        // if the first vertex is selected
        if (startVertex === null) {
            startVertex = canvas.getActiveObject();
            createFocusLine();
            canvas.discardActiveObject();
            return;
        }

        // remove lineFocus when the second vertex is chosen
        canvas.remove(canvas.getObjectByName('lineFocus'));

        // add the line
        var fromObject = startVertex;
        var toObject = e.target;
        var from = fromObject.getCenterPoint();
        var to = toObject.getCenterPoint();

        if (from.x != to.x || from.y != to.y) {
            var line = new fabric.Line([from.x, from.y, to.x, to.y], defaultLine);
            canvas.add(line);
            fromObject.from.push(line);
            toObject.to.push(line);

            // sendToBack() is used to get an object to the bottom
            line.sendToBack();
        }
        startVertex = null;
        canvas.discardActiveObject();
    });
}