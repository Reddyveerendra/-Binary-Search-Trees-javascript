class node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}
class BST {
    constructor() {
        this.root = null;
    }
    add(data) {
        if (!this.root) {
            this.root = new node(data);
            return this;
        }
        else {
            let temp = this.root;
            let searchTree = function (temp) {
                if (temp.data < data) {
                    if (!temp.right) {
                        temp.right = new node(data);
                        return;
                    }
                    else {
                        return searchTree(temp.right);
                    }
                }
                else if (data < temp.data) {
                    if (!temp.left) {
                        temp.left = new node(data);
                    }
                    else {
                        searchTree(temp.left);
                    }
                }
                else {
                    return null;
                }
            }
            return searchTree(temp);
        }
    }
}


/* FUNCTIONS ---------START----------*/

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

function mergeSort(arr) {
    if (arr.length > 1) {
        let mid = Math.round(arr.length / 2);
        let left = arr.slice(0, mid);
        let right = arr.slice(mid);
        mergeSort(left);
        mergeSort(right);
        let i = 0, j = 0, k = 0;
        while (left.length > i && right.length > j) {
            if (left[i] <= right[j]) {
                arr[k] = left[i];
                i += 1;
            }
            else {
                arr[k] = right[j];
                j += 1;
            }
            k += 1
        }
        while (i < left.length) {
            arr[k] = left[i];
            i += 1;
            k += 1;
        }
        while (j < right.length) {
            arr[k] = right[j];
            j += 1;
            k += 1;
        }
    }
}
var arr = [];
function takeAction() {
    console.clear();
    let data = document.getElementById("data").value;
    arr = data.split(",")
    arr = arr.map(function (x) {
        return parseInt(x, 10);
    })
    var tree = new BST();
    mergeSort(arr);
    arr = arr.filter((item, pos) => {
        return arr.indexOf(item) == pos;
    });
    console.log(arr);
    document.getElementById("d").textContent = "open console to see result";
    document.getElementById("data").value = "";
    function dataSender(arr) {
        if (arr.length > 1) {
            let mid = Math.round(arr.length / 2);
            if (arr.length % 2 != 0) {
                mid = Math.round(arr.length / 2) - 1;
            };
            console.log(arr[mid]);
            tree.add(arr[mid]);
            dataSender(arr.slice(mid + 1,))
            dataSender(arr.slice(0, mid))

        }
        if (arr.length == 1) {
            tree.add(arr[0])
        }
    }
    /* FUNCTIONS ---------END--------- */
    dataSender(arr)
    prettyPrint(tree.root);
}
