function linkInit() {
    // initial link mode
    $("#link").click(function () {
        canvas.discardActiveObject();

        // set default color
        defaultLine.stroke = '#000000';
        document.querySelector('#colorPicker').jscolor.fromString('000000');

        // enable the directed/undirected buttons
        $("#direct").removeAttr("disabled").removeProp("disabled");
        $("#undirect").removeAttr("disabled").removeProp("disabled");
        isDirect = document.getElementById("direct").checked;
    });

    // the edge is directed or not 
    $("#direct").click(function () {
        isDirect = true;
    });
    $("#undirect").click(function () {
        isDirect = false;
    });

    // when linking two vertexs, and the first one is chosen, activate the FocusLine
    canvas.on('mouse:up', function (e) {
        if (document.getElementById("link").checked != true || e.target === null) {
            return;
        }

        // if the first vertex isn't selected
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