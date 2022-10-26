// create a new vertex
function addVertex(x, y, color) {
    if (document.getElementById("create").checked != true) {
        return;
    }

    var idx = getVertexArrUnusedIndex();
    insertVertexArr(idx);

    // create a vertex
    var Vertex = new fabric.Circle(defaultVertex);
    Vertex.setColor(color);

    // create the related context
    var Content = new fabric.Text('' + idx, defaultContext);

    // group them
    var group = new fabric.Group([Vertex, Content], {
        left: x,
        top: y,
        hasControls: false,
        hasBorders: false
    });

    // to save edges
    group.from = [];
    group.to = [];
    group.name = "vertex" + idx;
    group.isVertex = true;

    canvas.add(group);
    canvas.renderAll();
}

function createInit() {
    // initial create mode
    $("#create").click(function () {
        canvas.discardActiveObject();
        canvas.remove(canvas.getObjectByName('lineFocus'));
        startVertex = null;

        // set default color
        document.querySelector('#colorPicker').jscolor.fromString('ffffff');
        VertexColor = '#ffffff';
    });

    // if not click on existing objects, create a new vertex 
    canvas.on('mouse:up', function (e) {
        if (e.target) {
            return
        }
        addVertex(e.e.x - 30, e.e.y - 90, VertexColor);
    });
}