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
        canvas.removeVertex(e.target);
        removeVertexArrByName(e.target.name);
    });
}