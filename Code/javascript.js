
var BST = function () {
    var Node = function (leftChild, key, value, rightChild, parent) {
        return {
            leftChild: (typeof leftChild === "undefined") ? null : leftChild,
            key: (typeof key === "undefined") ? null : key,
            value: (typeof value === "undefined") ? null : value,
            rightChild: (typeof rightChild === "undefined") ? null : rightChild,
            parent: (typeof parent === "undefined") ? null : parent
            //x: (typeof x === "undefined") ? null : x,
            //y: (typeof y === "undefined") ? null : y
        };
    },
        arrTree = new Array(),
        findAndRemove = function (array, property, value) {
            try {
                var pre = predecessorNode(root);
                var succ = successorNode(root);
                if (parseInt(value) === root.key) {
                    if (pre === null) {
                        value = succ.toString();
                        root = succ;
                    }
                    else {
                        value = pre.toString();

                        root = pre;
                    }
                    //arrTree[0] = pre;
                }
                $.each(array, function (index, result) {
                    if (result[property] == value) {
                        //Remove from array
                        array.splice(index, 1);
                    }
                    //alert("Node has been deleted.");
                });
            }
            catch (ex) { }
        },
        root = new Node(),
        draw = function (x, y, key, peviousX, peviousY, color, textcolor) {

            var canvas = document.getElementById("canvas");
            var context = canvas.getContext("2d");
            var text = key;
            context.fillStyle = color;
            context.beginPath();
            var radius = 9; // for example
            context.arc(x, y, radius, 0, Math.PI * 2);
            context.closePath();
            context.fill();
            context.moveTo(peviousX, peviousY);
            context.lineTo(x, y);
            context.stroke();
            context.fillStyle = textcolor; // font color to write the text with
            var font = " " + radius + "px serif";
            context.font = font;
            // Move it down by half the text height and left by half the text width
            var width = context.measureText(text).width;
            var height = context.measureText("w").width; // this is a GUESS of height
            context.fillText(text, x - (width / 2), y + (height / 2));


        },

        drawnode = function (node, key, x, y, peviousX, peviousY, tmp) {
            if (node.key === null) {
                return null; // key not found
            }
            draw(x, y, node.key, x, y, "Aqua", "black");
            var nodeKey = parseInt(node.key, 10);

            if (key < nodeKey) {
                tmpx = x;
                tmpy = y;
                x = x - tmp;
                y += 85;
                tmp /= 2;
                draw(x, y, node.leftChild.key, x, y, "Aqua", "black");
                return drawnode(node.leftChild, key, x, y, tmpx, tmpy, tmp);
            } else if (key > nodeKey) {
                tmpx = x;
                tmpy = y;
                x = x + tmp;
                y += 85;
                tmp /= 2;
                draw(x, y, node.rightChild.key, x, y, "Aqua", "black");
                return drawnode(node.rightChild, key, x, y, tmpx, tmpy, tmp);
            } else { // key is equal to node key
                draw(x, y, key, x, y, "Aqua", "black");
                return true;
            }
        },

        maxDepth = function (node) {
            if (node.key === null) {
                return null;
            }
            else {
                // compute the depth of each subtree
                var lDepth = maxDepth(node.leftChild);
                var rDepth = maxDepth(node.rightChild);
                // use the larger one
                if (lDepth > rDepth) return (lDepth + 1);
                else return (rDepth + 1);
            }
        },
       searchNode = function (node, key, x, y, peviousX, peviousY, tmp) {
           if (node.key === null) {
               alert("Not found")
               return null; // key not found
           }

           var nodeKey = parseInt(node.key, 10);

           if (key < nodeKey) {
               peviousX = x;
               peviousY = y;
               x = x - tmp;
               y += 85;
               tmp /= 2;
               return searchNode(node.leftChild, key, x, y, peviousX, peviousY, tmp);

           }
           else if (key > nodeKey) {
               peviousX = x;
               peviousY = y;
               x = x + tmp;
               y += 85;
               tmp /= 2;
               return searchNode(node.rightChild, key, x, y, peviousX, peviousY, tmp);

           } else { // key is equal to node key
               draw(x, y, key, x, y, "GreenYellow", "black");
               alert("Node found.\n the node's value is : " + node.value);
               draw(x, y, key, x, y, "Aqua", "black");
               return node.value;

           }
       },
        insertNode = function (node, key, value, parent, x, y, peviousX, peviousY, tmp) {
            if (node.key === null) {
                node.leftChild = new Node();
                node.key = key;
                node.value = value;
                node.rightChild = new Node();
                node.parent = parent;
                draw(x, y, key, peviousX, peviousY, "Aqua", "black");
                return true;
            }

            var nodeKey = parseInt(node.key, 10);

            if (key < nodeKey) {
                peviousX = x;
                peviousY = y;
                x = x - tmp;
                y += 85;
                tmp /= 2;
                //peviousX += 50;
                //peviousY -= 50;
                //draw(x, 2, value);
                insertNode(node.leftChild, key, value, node, x, y, peviousX, peviousY, tmp);
            }
            else if (key > nodeKey) {
                peviousX = x;
                peviousY = y;
                x = x + tmp;
                y += 85;
                tmp /= 2;
                //peviousX -= 50;
                //peviousY -= 50;
                //draw(x, y, value);
                insertNode(node.rightChild, key, value, node, x, y, peviousX, peviousY, tmp);
            } else { // key is equal to node key, update the value
                node.value = value;
                draw(x, y, key, x, y, "LightCoral ", "black");
                alert("Node is already here.")
                draw(x, y, key, peviousX, peviousY, "Aqua", "black");
                return true;
            }
        },
        traverseNode = function (node, callback) {
            if (node.key !== null) {
                traverseNode(node.leftChild, callback);
                callback(node.key, node.value);
                traverseNode(node.rightChild, callback);
            }

            return true;
        },
        minNode = function (node) {
            var x = 650, y = 20, peviousX = 650, peviousY = 20;
            var tmp = 300;
            while (node.leftChild.key !== null) {
                peviousX = x;
                peviousY = y;
                x = x - tmp;
                y += 85;
                tmp /= 2;
                node = node.leftChild;
            }
            draw(x, y, node.key, x, y, "Gold", "black");
            alert("Min key : " + node.key)
            draw(x, y, node.key, x, y, "Aqua", "black");
            return node.key;
        },
       maxNode = function (node) {
           var x = 650, y = 20, peviousX = 650, peviousY = 20;
           var tmp = 300;
           while (node.rightChild.key !== null) {
               peviousX = x;
               peviousY = y;
               x = x + tmp;
               y += 85;
               tmp /= 2;
               node = node.rightChild;
           }
           draw(x, y, node.key, x, y, "Tomato", "black");
           alert("Max key : " + node.key);
           draw(x, y, node.key, x, y, "Aqua", "black");
           return node.key;
       },

        max = function (node) {
            while (node.rightChild.key !== null) {
                node = node.rightChild;
            }
            return node.key;
        },
        min = function (node) {
            while (node.leftChild.key !== null) {
                node = node.leftChild;
            }
            return node.key;
        },
        successorNode = function (node) {
            var parent;

            if (node.rightChild.key !== null) {
                return min(node.rightChild);
            }

            parent = node.parent;
            while (parent !== null && node == parent.rightChild) {
                node = parent;
                parent = parent.parent;
            }

            return parent;
        },
        predecessorNode = function (node) {
            var parent;

            if (node.leftChild.key !== null) {
                return max(node.leftChild);
            }

            parent = node.parent;
            while (parent != null && node == parent.leftChild) {
                node = parent;
                parent = parent.parent;
            }

            return parent;
        },

    ///////////////////////////////////////////////////////////////////////
        Delete = function (nodeKey) {
            var pre = predecessorNode(root);
            var succ = successorNode(root);
            if (nodeKey === root.key) {
                if (pre === null) {
                    nodeKey = succ.toString();
                }
                else {
                    nodeKey = pre.toString();
                }
            }
                findAndRemove(arrTree, "varKey", nodeKey);
                root = new Node();
                for (var i = 0; i < arrTree.length; i++) {
                    insertNode(root, arrTree[i].varKey, arrTree[i].varValue, null, 650, 20, 650, 20, 300);
                    drawnode(root, arrTree[i].varKey, 650, 20, 650, 20, 300);

                }
                //drawnode(root, nodeKey, 650, 20, 650, 20, 300);
            
        };

    ///////////////////////////////////////////////////////////////////////
    return {
        search: function (key) {
            var keyInt = parseInt(key, 10);

            if (isNaN(keyInt)) {
                return undefined; // key must be a number
            } else {
                return searchNode(root, keyInt, 650, 20, 650, 20, 300);
            }
        },
        insert: function (key, value) {

            var keyInt = parseInt(key, 10);
            var test = 0;
            for (var i = 0; i < arrTree.length; i++) {
                if (arrTree[i].varKey === keyInt) {
                    test = 1;
                    break;
                }
            }
            if (test === 0) {
                arrTree.push({ varKey: keyInt, varValue: value }); //**********************
            }
            if (isNaN(keyInt)) {
                return undefined; // key must be a number
            } else {
                insertNode(root, keyInt, value, null, 650, 20, 650, 20, 300);
                return drawnode(root, keyInt, 650, 20, 650, 20, 300);
            }

        },
        traverse: function (callback) {
            if (typeof callback === "undefined") {
                callback = function (key, value) {
                    print(key + " : " + value);
                };
            }

            return traverseNode(root, callback);
        },
        min: function () {
            return minNode(root);
        },
        max: function () {
            return maxNode(root);
        },
        successor: function () {
            return successorNode(root);
        },
        predecessor: function () {
            return predecessorNode(root);
        },
        maxdepth: function () {
            return maxDepth(root);
        },

        Delete: function (nodeKey) {
            return Delete(nodeKey);
        }
    };
};
