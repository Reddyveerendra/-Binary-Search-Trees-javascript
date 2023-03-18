class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.right = left;
        this.left = left;
    }
}
class BST {
    constructor() {
        this.root = null;
    }
    add(data) {
        const node = this.root;
        if (!node) {
            this.root = new Node(data)
            return;
        }
        const searchTree = function (node) {
            if (data < node.data) {
                if (!node.left) {
                    node.left = new Node(data);
                    return;
                }
                return searchTree(node.left);
            }
            if (!node.right) {
                node.right = new Node(data);
                return;
            }
            return searchTree(node.right);
        }
        return searchTree(node);
    }
}
function mergeSort(arr) {
    if (arr.length > 1) {
        let mid = Math.round(arr.length / 2);
        let left = arr.slice(0, mid);
        let right = arr.slice(mid,);
        mergeSort(left);
        mergeSort(right);
        let i = 0, k = 0, j = 0;
        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                arr[k] = left[i]
                k += 1
                i += 1
            }
            else {
                arr[k] = right[j]
                k += 1
                j += 1
            }
        }
        while (i < left.length) {
            arr[k] = left[i]
            k += 1
            i += 1
        }
        while (j < right.length) {
            arr[k] = right[j]
            k += 1
            j += 1
        }
    }
}
let tree = new BST();
let arr = [5, 6, 7, 2, 4, 2, 45, 23, 6, 28, 2, 4, 1, 51, 84, 3, 53, 3, 2, 36, 29, 34, 62, 71, 93];
arr = arr.filter((item, index) => arr.indexOf(item) === index);
mergeSort(arr);
function dataSender(arr) {
    if (arr.length > 1) {
        let mid = Math.round(arr.length / 2)
        tree.add(arr[Math.round(arr.length / 2)])
        dataSender(arr.slice(0, mid))
        dataSender(arr.slice(mid + 1,))
    }
    if (arr.length == 1) {
        tree.add(arr[0])
    }
}
dataSender(arr)
const prettyPrint = (node, prefix = '', isLeft = true) => {
    let div = document.getElementById("d");
    let p = document.createElement("p");
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    const s = `${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`
    console.log(s);
    p.textContent = s;
    div.appendChild(p)
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}
prettyPrint(tree.root)
console.log(arr)