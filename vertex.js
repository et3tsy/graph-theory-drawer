// in create mode, return the biggest index number unused
function getVertexArrUnusedIndex() {
    var x = 0;
    for (var i = 0; i < VertexArr.length; i++) {
        if (x == VertexArr[i]) {
            x++;
        }
        else {
            break;
        }
    }
    return x;
}

// insert the new index number into VertexArr
function insertVertexArr(val) {
    var index = 0;
    for (; index < VertexArr.length; index++) {
        if (val < VertexArr[index]) {
            VertexArr.splice(index, 0, val);
            break;
        }
    }
    if (index === VertexArr.length) {
        VertexArr.push(index);
    }
}

// remove the new index number into VertexArr
function removeVertexArrByName(str) {
    val = parseInt(str.substring(6));
    VertexArr.forEach((item, idx) => {
        if (item == val) {
            VertexArr.splice(idx, 1);
            return;
        }
    })
}

// get a copy of an array
function copyArr(arr) {
    let ret = []
    arr.forEach((item) => {
        ret.push(item)
    });
    return ret
}

// set vertex's color
function setColor(color) {
    VertexColor = color;
    canvas.renderAll();
}