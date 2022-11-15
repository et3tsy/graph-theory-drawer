function inputInit() {
    var oldVertex = [];
    var oldEdge = [];

    // clear the input
    $("#GraphData").val('');

    // delete the old vertexs
    function delOldVertex(vertexDel) {
        console.log(vertexDel);

        for (var i = 0; i < vertexDel.length; i++) {
            canvas.removeVertex(canvas.getObjectByName('vertex' + vertexDel[i][0]));
        }
    }

    // add the new vertexs
    function addNewVertex(vertexAdd) {
        for (var i = 0; i < vertexAdd.length; i++) {
            var arg = getRandomPosition();
            addVertex(arg[0], arg[1], VertexColor, vertexAdd[i][0]);
        }
    }

    // delete the old edges
    function delOldEdge(edgeDel) {
        // for (var i = 0; i < edgeDel.length; i++) {
        //     //var from
        //     var item = canvas.getObjectByName(edgeDel[i]);

        //     canvas.removeLine(item);
        //     canvas.remove(item);
        // }
    }

    // figure out what lines are edited -- the vertexs deleted, the vertexs added, the edges deleted, and the edges added
    function renewArr(newVertex, newEdge) {
        var vertexDel = [];
        var vertexAdd = [];
        var edgeDel = [];
        var edgeAdd = [];

        var i = 0;
        var j = 0;


        // check vertexs
        for (; i < oldVertex.length && j < newVertex.length;) {
            if (oldVertex[i][0] == newVertex[j][0]) {
                i++;
                j++;
            } else if (oldVertex[i][0] < newVertex[j][0]) {
                vertexDel.push(oldVertex[i]);
                i++;
            } else {
                vertexAdd.push(newVertex[j]);
                j++;
            }
        }
        vertexDel = vertexDel.concat(oldVertex.slice(i));
        vertexAdd = vertexAdd.concat(newVertex.slice(j));

        // check edges
        i = j = 0;
        function cmp(a, b) {
            for (var i = 0; i < 2; i++) {
                if (a[i] > b[i]) return 1;
                if (a[i] < b[i]) return -1;
            }
            return 0;
        }
        for (; i < oldEdge.length && j < newEdge.length;) {
            if (cmp(oldEdge[i], newEdge[j]) === 0) {
                i++;
                j++;
            } else if (cmp(oldEdge[i], newEdge[j]) === -1) {
                edgeDel.push(oldEdge[i]);
                i++;
            } else {
                edgeAdd.push(newEdge[j]);
                j++;
            }
        }
        edgeDel = edgeDel.concat(oldEdge.slice(i));
        edgeAdd = edgeAdd.concat(newEdge.slice(j));

        oldVertex = newVertex;
        oldEdge = newEdge;

        delOldVertex(vertexDel);
        addNewVertex(vertexAdd);
        delOldEdge(edgeDel);

    }

    // refresh the data saved in the arr into the input
    function refresh() {
        var str = '';
        for (var i = 0; i < oldVertex.length; i++) {
            str += oldVertex[i] + '\n';
        }
        for (var i = 0; i < oldEdge.length; i++) {
            str += oldEdge[i][0] + ' ' + oldEdge[i][1] + '\n';
        }
        $("#GraphData").val(str);
    }


    // when mouse move out of the input area, check if data is valid
    $("#GraphData").mouseleave(function () {
        var str = $('#GraphData').val();
        var arrStr = str.split('\n');
        var arr = [];
        var flag = false; // if meet the first line of the edges, turn it into true

        for (var i = 0; i < arrStr.length; i++) {
            if (arrStr[i] == '') {
                continue;
            }

            var tmp = arrStr[i].split(' ');
            var num = [];

            // to check if any chars are not between '0' and '9'
            for (var j = 0; j < tmp.length; j++) {
                if (isNaN(parseInt(tmp[j]))) {
                    alert("请检查数据 只支持数字字符");
                    return;
                }
                num.push(parseInt(tmp[j]));
            }

            // to check if there are more than three integers in one line
            if (tmp.length > 2) {
                alert("请检查数据 一行不能超过三个");
                return;
            }
            if (tmp.length == 2) {
                flag = true;
            } else {
                if (flag) {
                    alert("请检查数据 点边数据颠倒");
                    return;
                }
            }
            arr.push(num);
        }

        // the new vertexs and edges in the input
        var newVertex = [];
        var newEdge = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].length == 1) {
                newVertex.push(arr[i]);
            } else {
                newEdge.push(arr[i]);
            }
        }

        // make the array in increasing order
        newVertex.sort(function (a, b) {
            if (a.length == b.length) {
                return a - b;
            }
            return a.length - b.length;
        });
        newEdge.sort(function (a, b) {
            if (a[0] == b[0]) {
                return a[1] - b[1];
            }
            return a[0] - b[0];
        })

        renewArr(newVertex, newEdge);
        refresh();
    });
}


