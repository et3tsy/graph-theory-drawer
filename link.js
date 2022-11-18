function linkInit() {
    // initial link mode
    $("#link").click(function () {
        canvas.discardActiveObject();

        // set default color
        defaultLine.stroke = '#000000';
        document.querySelector('#colorPicker').jscolor.fromString('000000');
    });

    // when linking two vertexs, and the first one is chosen, activate the FocusLine
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
        EdgeArr.push([parseInt(startVertex.name.substring(6)), parseInt(e.target.name.substring(6))])
        canvas.refresh();
        canvas.AddLine(startVertex, e.target);
    });
}