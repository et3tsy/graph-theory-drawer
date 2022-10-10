// create a new vertex
function addVertex(x, y, color) {
    if (document.getElementById("create").checked != true) {
        return;
    }
    var Vertex = new fabric.Circle(defaultVertex);
    var idx = getVertexArrUnusedIndex();
    insertVertexArr(idx);

    Vertex.setColor(color);
    Vertex.left = x;
    Vertex.top = y;
    Vertex.name = "vertex" + idx;
    Vertex.from = [];
    Vertex.to = [];
    canvas.add(Vertex);
    canvas.renderAll();
}

function createInit() {
    // initial create mode
    $("#create").click(function () {
        canvas.discardActiveObject();
        canvas.remove(canvas.getObjectByName('lineFocus'));
        startVertex = null;
    });

    // if not click on existing objects, create a new vertex 
    canvas.on('mouse:up', function (e) {
        if (e.target) {
            return
        }
        addVertex(e.e.x - 10, e.e.y - 100, VertexColor);
    });
}