// create a new vertex
function addVertex(x, y, color, idx) {
    if (document.getElementById("create").checked != true) {
        return;
    }

    if (idx === null) idx = getVertexArrUnusedIndex();
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

// return an random position for a vertex, trying its best to keep away from other vertexs
function getRandomPosition() {
    for (var i = 0; i < 100; i++) {
        var x = Math.random() * (canvasWidth - VertexRadius - 2 * padding);
        var y = Math.random() * (canvasHeight - VertexRadius - 2 * padding);

        var flag = true;
        for (var j = 0; j < VertexArr.length; j++) {
            var obj = canvas.getObjectByName('vertex' + VertexArr[j]);
            if (Math.pow(Math.abs(x - obj.left), 2) + Math.pow(Math.abs(y - obj.top), 2) < 4 * Math.pow(VertexRadius, 2)) {
                flag = false;
                break;
            }
        }

        // if found
        if (flag) {
            return [x, y];
        }
    }
    return [0, 0]
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
        addVertex(e.e.x - 30, e.e.y - 90, VertexColor, null);
    });
}