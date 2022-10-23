// when linking two vertexs, draw a line, called lineFocus, 
// between the mouse pointer and the start vertex
function createFocusLine() {
    var pointer = canvas.getActiveObject();
    var points = [pointer.left + VertexRadius, pointer.top + VertexRadius, pointer.left + VertexRadius, pointer.top + VertexRadius];

    lineFocus = new fabric.Line(points, {
        strokeWidth: 5,
        opacity: 0.1,
        fill: '#39ff14',
        stroke: '#39ff14',
        originX: 'center',
        originY: 'center',
        selectable: false,
        hasControls: false,
        hasBorders: false,
        evented: false,
        targetFindTolerance: true,
        name: 'lineFocus',
    });

    canvas.add(lineFocus);
    lineFocus.sendToBack();
    canvas.renderAll();
}

function moveInit() {
    // prevent objects to reach the edge of the canvas
    canvas.on('object:moving', function (e) {
        var obj = e.target;
        if (obj.currentHeight > obj.canvas.height - padding ||
            obj.currentWidth > obj.canvas.width - padding) {
            return;
        }
        obj.setCoords();
        if (obj.getBoundingRect().top < padding || obj.getBoundingRect().left < padding) {
            obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top + padding);
            obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left + padding);
        }
        if (obj.getBoundingRect().top + obj.getBoundingRect().height > obj.canvas.height - padding || obj.getBoundingRect().left + obj.getBoundingRect().width > obj.canvas.width - padding) {
            obj.top = Math.min(
                obj.top,
                obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top - padding
            );
            obj.left = Math.min(
                obj.left,
                obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left - padding
            );
        }
    });

    // modify lineFocus when moving mouse pointer
    canvas.on('mouse:move', function (o) {
        if (document.getElementById("link").checked != true) {
            return;
        }

        var lineFocus = canvas.getObjectByName('lineFocus');
        if (lineFocus === null) {
            return;
        }

        // when mouse touches an object, fix the end of the line to the center
        if (o.target !== null) {
            var x2 = o.target.left + VertexRadius;
            var y2 = o.target.top + VertexRadius;
            lineFocus.set({
                x2: x2,
                y2: y2
            });
        } else {
            var pointer = canvas.getPointer(o.e);
            lineFocus.set({
                x2: pointer.x,
                y2: pointer.y
            });
        }
        canvas.renderAll();
    });

    // when moving a vertex, update the connected edges' position
    canvas.on('object:moving', function (e) {
        var object = e.target;
        var objectCenter = object.getCenterPoint();

        if (object.from)
            object.from.forEach(function (e) {
                e.set({
                    'x1': objectCenter.x,
                    'y1': objectCenter.y
                });
            })
        if (object.to)
            object.to.forEach(function (e) {
                e.set({
                    'x2': objectCenter.x,
                    'y2': objectCenter.y
                });
            })

        canvas.renderAll();
    });

}