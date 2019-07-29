// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
console.log = (msg) => {
  appDiv.innerHTML += msg + '</br>';
}
console.clear = () => {
  appDiv.innerHTML = '';
}
/********************************************************
 * In a Binary Search Tree (BST), an Inorder Successor
 * of a node is defined as the node with the smallest
 * key greater than the key of the input node
 * (see examples below).
 *
 * Given a node inputNode in a BST, you’re asked to
 * write a function findInOrderSuccessor that returns
 * the Inorder Successor of inputNode. If inputNode
 * has no Inorder Successor, return null.
 *
 *        20
 *     9     25
 *  5     12
 *     11    14
 *
 *
 * CODE INSTRUCTIONS:                                   *
 * 1) The method findInOrderSuccessor you're asked      *
 *    to implement is located at line 26.               *
 * 2) Use the helper code below to implement it.        *
 * 3) In a nutshell, the helper code allows you to      *
 *    to build a Binary Search Tree.                    *
 * 4) Jump to line 94 to see an example for how the     *
 *    helper code is used to test findInOrderSuccessor. *
 ********************************************************/


// Constructor to create a new Node
function Node(key) {
    this.key = key;
    this.parent = null;
    this.left = null;
    this.right = null;
}

// Constructor to create a new BST
function BinarySearchTree() {
    this.root = null;

    BinarySearchTree.prototype.getLeastChildFromNode = function(node) {
      if (!node || !node.left) {
        return node;
      }
      return this.getLeastChildFromNode(node.left);
    };

    BinarySearchTree.prototype.getLeastParentFromNode = function(node) {
      if (!node || !node.parent) {
        return null;
      }
      if (node == node.parent.right) {
        return this.getLeastParentFromNode(node.parent);
      }
      return node.parent;
    };

    BinarySearchTree.prototype.findInOrderSuccessor = function(inputNode) {
      // your code goes here
      var rightNode = inputNode.right;
      var inputKey = inputNode.key;
      
      var succ = this.getLeastChildFromNode(rightNode);
      if (!succ) {
        succ = this.getLeastParentFromNode(inputNode);
      }
      if(!succ) {
        return new Node(null);
      }
      return succ;
    };

    // Creates a new node by a key and inserts it to the BST
    BinarySearchTree.prototype.insert = function(key) {

        var root = this.root;

        // 1. If the tree is empty, create the root
        if(!root) {
            this.root = new Node(key);
            return;
        }

        // 2) Otherwise, create a node with the key
        //    and traverse down the tree to find where to
        //    to insert it
        var currentNode = root;
        var newNode = new Node(key);

        while(currentNode !== null) {
            if(key < currentNode.key) {
                if(!currentNode.left) {
                    currentNode.left = newNode;
                    newNode.parent = currentNode;
                    break;
                } else {
                    currentNode = currentNode.left;
                }
            } else {
                if(!currentNode.right) {
                    currentNode.right = newNode;
                    newNode.parent = currentNode;
                    break;
                } else {
                    currentNode = currentNode.right;
                }
            }
        }
    };

    // Returns a reference to a node in the BST by its key.
    // Use this fuction when you need a node to test your
    // findInOrderSuccessor function on.
    BinarySearchTree.prototype.getNodeByKey = function(key) {
        var currentNode = this.root;

        while(currentNode) {
            if(key === currentNode.key) {
                return currentNode;
            }

            if(key < currentNode.key) {
                currentNode = currentNode.left;
            }
            else {
                currentNode = currentNode.right;
            }
        }

        return null;
    };

};

/*********************************************
 * Driver program to test above function     *
 *********************************************/
function runProgram() {
  console.clear();
  // Create a Binary Search Tree
  var bst = getTestBST();
  // Find the in order successor of testsBtn
  var key = document.getElementById("inputNumber").value;
  var succ = findInOrderSuccessorForKey(bst,key);

  // Print the key of the successor node
  if(succ) {
      console.log("Inorder successor of " + key + " is " + succ.key);
  } else {
      console.log("Inorder successor does not exist");
  }
}

function getTestBST() {
  var bst = new BinarySearchTree();
  bst.insert(20);
  bst.insert(9);
  bst.insert(25);
  bst.insert(5);
  bst.insert(12);
  bst.insert(11);
  bst.insert(14);
  return bst;
}

function findInOrderSuccessorForKey(bst, nodeKey) {
  var key = Number(nodeKey);
  var test = bst.getNodeByKey(key);
  // Find the in order successor of test
  return test ? bst.findInOrderSuccessor(test) : null;
}

function runTests() {
  console.clear();
  // Create a Binary Search Tree
  var bst = getTestBST();
  var succ = null;
  // Find the in order successor of test
  succ = findInOrderSuccessorForKey(bst,20);
  console.log('20 => 25 ' + ((succ && succ.key === 25) ? 'PASS' : 'FAIL'));
  succ = findInOrderSuccessorForKey(bst,9);
  console.log('9 => 11 ' + ((succ && succ.key === 11) ? 'PASS' : 'FAIL'));
  succ = findInOrderSuccessorForKey(bst,25);
  console.log('25 => null ' + ((!succ || !succ.key) ? 'PASS' : 'FAIL'));
  succ = findInOrderSuccessorForKey(bst,5);
  console.log('5 => 9 ' + ((succ && succ.key === 9) ? 'PASS' : 'FAIL'));
  succ = findInOrderSuccessorForKey(bst,12);
  console.log('12 => 14 ' + ((succ && succ.key === 14) ? 'PASS' : 'FAIL'));
  succ = findInOrderSuccessorForKey(bst,11);
  console.log('11 => 12 ' + ((succ && succ.key === 12) ? 'PASS' : 'FAIL'));
  succ = findInOrderSuccessorForKey(bst,14);
  console.log('14 => 20 ' + ((succ && succ.key === 20) ? 'PASS' : 'FAIL'));

}

document.getElementById("goBtn").addEventListener("click", runProgram);
document.getElementById("testsBtn").addEventListener("click", runTests);
