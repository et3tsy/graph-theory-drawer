function deleteInit() {
    // initial delete mode
    $("#delete").click(function () {
        canvas.discardActiveObject();
        canvas.remove(canvas.getObjectByName('lineFocus'));
        startVertex = null;
    });

    // when deleting a vertex, remove the connected edges
    canvas.on('mouse:up', function (e) {
        if (document.getElementById("delete").checked != true || e.target === null) {
            return;
        }

        var toArr = copyArr(e.target.to);
        var fromArr = copyArr(e.target.from);

        // remove the edge records saved in each vertex
        toArr.forEach((item) => {
            canvas.removeLine(item);
        })
        fromArr.forEach((item) => {
            canvas.removeLine(item);
        })

        // remove relevant objects on the canvas
        toArr.forEach((item) => {
            canvas.remove(item);
        })
        fromArr.forEach((item) => {
            canvas.remove(item);
        })

        console.log(e.target);
        removeVertexArrByName(e.target.name);
        canvas.remove(e.target);
        canvas.renderAll();
    });
}