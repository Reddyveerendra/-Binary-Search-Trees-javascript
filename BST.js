/* NODE CLASS */
class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

/* BINARY SEARCH TREE CLASS*/
class BST {
    constructor() {
        this.root = null;
    }
    add(data) {
        let temp = this.root;
        if (!this.root) {
            this.root = new Node(data);
            return this;
        }
        else {
            let searchTree = function (temp) {
                if (temp.data < data) {
                    if (!temp.right) {
                        temp.right = new Node(data)
                        return;
                    }
                    else {
                        return searchTree(temp.right)
                    }
                }
                else if (temp.data > data) {
                    if (!temp.left) {
                        temp.left = new Node(data);
                        return temp;
                    }
                    else {
                        return searchTree(temp.left);
                    }
                }
                else {
                    return;
                }
            }
            searchTree(temp);
        }
    }
    findMin() {
        let current = this.root;
        while (!current) {
            current = current.left;
        }
        return current.data;
    }
    findMax() {
        let current = this.root;
        while (!current) {
            current = current.right;
        }
        return current.data;
    }
    find(data) {
        let current = this.root;
        while (current.data != data) {
            if (data < current.data) {
                current = current.left;
            }
            else {
                current = current.right;
            }
            if (!current) {
                return;
            }
        }
        return current;
    }
    isPresent(data) {
        let current = this.root;
        while (current) {
            if (data == current.data) {
                return true;
            }
            if (data < current.data) {
                current = current.left;
            }
            else {
                current = current.right;
            }
        }
        return false;
    }
    del(data) {
        const removeNode = function (node, data) {
            if (!node) {
                return;
            }
            if (data == node.data) {
                if (!node.left && !node.right) {
                    return null;
                }
                if (!node.left) {
                    return node.right;
                }
                if (!node.right) {
                    return node.left;
                }
                var tempNode = node.right;
                while (tempNode.left) {
                    tempNode = tempNode.left;
                }
                node.data = tempNode.data;
                node.right = removeNode(node.right, tempNode.data);
                return node;
            }
            else if (node.data < data) {
                node.right = removeNode(node.right, data);
                return node;
            }
            else {
                node.left = removeNode(node.left, data);
                return node;
            }
        }
        this.root = removeNode(this.root, data);
    }
    isBalanced() {
        return (this.findMinHeight() >= this.findMaxHeight() - 1)
    }
    findMinHeight(node = this.root) {
        if (node == null) {
            return -1;
        }
        let left = this.findMinHeight(node.left);
        let right = this.findMinHeight(node.right);
        if (left < right) {
            return left + 1;
        }
        else {
            return right + 1;
        }
    }
    findMaxHeight(node = this.root) {
        if (node == null) {
            return -1;
        }
        let left = this.findMaxHeight(node.left);
        let right = this.findMaxHeight(node.right);
        if (left > right) {
            return left + 1;
        }
        else {
            return right + 1;
        }
    }
    inOrder() {
        if (!this.root) {
            return;
        }
        var result = [];
        function traverseInOrder(node) {
            node.left && traverseInOrder(node.left);
            result.push(node.data);
            node.right && traverseInOrder(node.right);
        }
        traverseInOrder(this.root);
        return result;
    }
    postOrder() {
        if (!this.root) {
            return;
        }
        var result = [];
        function traverseInOrder(node) {
            node.left && traverseInOrder(node.left);
            node.right && traverseInOrder(node.right);
            result.push(node.data);
        }
        traverseInOrder(this.root);
        return result;
    }
    preOrder() {
        if (!this.root) {
            return;
        }
        var result = [];
        function traverseInOrder(node) {
            result.push(node.data);
            node.left && traverseInOrder(node.left);
            node.right && traverseInOrder(node.right);
        }
        traverseInOrder(this.root);
        return result;
    }
    levelOrder() {
        let result = [];
        let Q = [];
        if (this.root) {
            Q.push(this.root)
            while (Q.length) {
                let node = Q.shift();
                result.push(node.data);
                if (node.left) {
                    Q.push(node.left)
                }
                if (node.right) {
                    Q.push(node.right)
                }
            }
            return result
        }
        return;
    }
}

var tree = new BST();
/* MERGE SORT */

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

/* PRINT BINARY TREE */

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

/* ARRAY DATA */

function dataSender(arr) {
    if (arr.length > 1) {
        let mid = Math.round(arr.length / 2);
        if (arr.length % 2 != 0) {
            mid = Math.round(arr.length / 2) - 1;
        };
        tree.add(arr[mid]);
        dataSender(arr.slice(mid + 1,))
        dataSender(arr.slice(0, mid))
    }
    if (arr.length == 1) {
        tree.add(arr[0])
    }
}

/* ADD NEW ELEMENT */

function addElement() {
    let element = document.getElementById("element").value;
    element = parseInt(element);
    console.clear();
    if (!arr.includes(element)) {
        arr.push(element);
    }
    tree.add(element);
    prettyPrint(tree.root);
}

/* DELETE ELEMENT */

function delElement() {
    let element = document.getElementById("element").value;
    element = parseInt(element);
    if (arr.includes(element)) {
        console.clear();
        const i = arr.indexOf(element);
        arr.splice(i, 1);
        tree.del(element);
        prettyPrint(tree.root);
    }
}

function orderElements() {
    console.log("INORDER : ", tree.inOrder());
    console.log("PREORDER : ", tree.preOrder());
    console.log("POSTORDER : ", tree.postOrder());
    console.log("LEVELORDER : ", tree.levelOrder());
}

function findElement() {
    let element = document.getElementById("element").value;
    element = parseInt(element);
    console.clear();
    console.log(`POSITION OF ${element} is : `, tree.find(element));
    prettyPrint(tree.root);
}
function addArray() {
    let a = document.getElementById("arr").value;
    a = a.split(",")
    let i = 0;
    a.forEach(element => {
        a[i] = parseInt(element);
        i++;
    });
    mergeSort(a);
    arr = a;
    reBalance()
}
function reBalance() {
    console.clear()
    tree = new BST();

    mergeSort(arr);

    dataSender(arr);

    prettyPrint(tree.root);
}
/* FUNCTION CALLS */
function depth() {
    console.log('DEPTH : ', tree.findMaxHeight())
}
function isBalanced() {
    console.log('isBalanced : ', tree.isBalanced())
}
var arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]

mergeSort(arr);

dataSender(arr);

prettyPrint(tree.root);