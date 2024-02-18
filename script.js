"use strict";

const node1 = {
    prev: null,
    next: null,
    data: "A"
};

const node2 = {
    prev: null,
    next: null,
    data: "B"
}

const node3 = {
    prev: null,
    next: null,
    data: "C"   
}

const node4 = {
    prev: null,
    next: null,
    data: "D"
}

const node5 = {
    prev: null,
    next: null,
    data: "E"
}

const node6 = {
    prev: null,
    next: null,
    data: "F"
}

const node7 = {
    prev: null,
    next: null,
    data: "C"   
}

node1.next = node2;
node2.prev = node1;
node2.next = node3;
node3.prev = node2;
node3.next = node4;
node4.prev = node3;
node4.next = node5;
node5.prev = node4;

class Node {
    constructor(data) {
        this.data = data;  // Data stored in the node
        this.prev = null;  // Pointer to the previous node
        this.next = null;  // Pointer to the next node
    }
}



class linkedList{
    constructor() {
        this.head = node1;
        this.tail = node5;
    }

    //Muligvis ændre dumplist til dette
    /*
    dumpList() {
        let visited = new Set();
        let a_node = this.head;
        while (a_node !== null && !visited.has(a_node)) {
            visited.add(a_node);
            console.log(`
            node: ${a_node.data}
            -----------
                prev: ${a_node.prev ? a_node.prev.data : 'null'}
                next: ${a_node.next ? a_node.next.data : 'null'}
            `);
            a_node = a_node.next;
        }
    }
    */

    dumpList() {
        let a_node = this.head;
        while(a_node != null){
            console.log(`
            node: ${a_node.data}
            -----------
                prev: ${a_node.prev?.data}
                next: ${a_node.next?.data}
            `);
            a_node = a_node.next;
        }
    }

    addLast(node) {
        if(!this.head) {
                this.head = node;
                this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
    }

    addFirst(node) {
        if(!this.head) {
                this.head = node;
                this.tail = node;
        } else {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        }
    }

    removeLast() {
        if (!this.head) {
            // List is empty, nothing to remove
            return console.log("The list is empty, so i cant remove anything");
        }

        if (this.head === this.tail) {
            // There's only one element in the list
            this.head = null;
            this.tail = null;
            return;
        }

        // Get the new tail node
        let newTail = this.tail.prev;
        // Remove the current tail node
        newTail.next = null;
        // Update the tail pointer
        this.tail = newTail;

    }

    removeFirst() {
        if (!this.head) {
            // List is empty, nothing to remove
            return console.log("The list is empty, so i cant remove anything");
        }

        if (this.head === this.tail) {
            // There's only one element in the list
            this.head = null;
            this.tail = null;
            return console.log("You have now removed the last element from the LinkedList and it is now empty");
        }

        let newHead = this.head.next;
        newHead.prev = null;
        this.head = newHead;
    }

    removeNode(index) {
        if (index < 0) {
            // Invalid index
            return console.log("This index does not exist in the list - negative numbers does not work");
        }
    
        let currentNode = this.head;
        let currentIndex = 0;
    
        // Traverse the list to find the node at the specified index
        while (currentNode !== null && currentIndex < index) {
            currentNode = currentNode.next;
            currentIndex++;
        }
    
        if (currentNode === null) {
            // Index out of bounds
            return console.log("You gave an index that does not exist - too high");
        }
    
        if (currentNode === this.head) {
            // If the node to remove is the head
            this.head = currentNode.next;
        } else {
            // Update the previous node's next pointer to skip the node to be removed
            currentNode.prev.next = currentNode.next;
        }
    
        if (currentNode === this.tail) {
            // If the node to remove is the tail
            this.tail = currentNode.prev;
        } else {
            // Update the next node's previous pointer to skip the node to be removed
            currentNode.next.prev = currentNode.prev;
        }
    
        // Remove references from the node to be removed
        currentNode.prev = null;
        currentNode.next = null;
    }


    insertBeforeNode(dataToInsert, index) {
        if (index < 0) {
            // Invalid index
            return;
        }
    
        // Create a new node with the provided data
        let nodeToInsert = new Node(dataToInsert);
    
        // If the list is empty or the index is 0, insert the node as the head
        if (!this.head || index === 0) {
            nodeToInsert.next = this.head;
            if (this.head) {
                this.head.prev = nodeToInsert;
            }
            this.head = nodeToInsert;
            if (!this.tail) {
                this.tail = nodeToInsert;
            }
            return;
        }
    
        // Find the node before the specified index
        let currentNode = this.head;
        let currentIndex = 0;
        while (currentNode && currentIndex < index - 1) {
            currentNode = currentNode.next;
            currentIndex++;
        }
    
        if (!currentNode) {
            // Index out of bounds
            return;
        }
    
        // Insert the node between currentNode and its next node
        nodeToInsert.next = currentNode.next;
        nodeToInsert.prev = currentNode;
        if (currentNode.next) {
            currentNode.next.prev = nodeToInsert;
        }
        currentNode.next = nodeToInsert;
    
        // If the inserted node is the last node, update the tail pointer
        if (!nodeToInsert.next) {
            this.tail = nodeToInsert;
        }
    }

    insertAfterNode(dataToInsert, index) {
        if (index < 0) {
            // Invalid index
            return;
        }
    
        // Create a new node with the provided data
        let nodeToInsert = new Node(dataToInsert);
    
        // If the list is empty, insert the node as the head
        if (!this.head) {
            this.head = nodeToInsert;
            this.tail = nodeToInsert;
            return;
        }
    
        // Find the node at the specified index
        let currentNode = this.head;
        let currentIndex = 0;
        while (currentNode && currentIndex < index) {
            currentNode = currentNode.next;
            currentIndex++;
        }
    
        if (!currentNode) {
            // Index out of bounds
            return;
        }
    
        // Insert the node after currentNode
        nodeToInsert.prev = currentNode;
        nodeToInsert.next = currentNode.next;
        if (currentNode.next) {
            currentNode.next.prev = nodeToInsert;
        }
        currentNode.next = nodeToInsert;
    
        // If the inserted node is the last node, update the tail pointer
        if (!nodeToInsert.next) {
            this.tail = nodeToInsert;
        }
    }

    swapNodes(index1, index2) {
            // If indices are equal or either index is negative
        if (index1 === index2 || index1 < 0 || index2 < 0) {
            return console.log("One or more of the index numbers u gave me are out of bounds");
        }

        // Initialize pointers and indices
        let currentNode1 = this.head;
        let currentNode2 = this.head;
        let currentIndex1 = 0;
        let currentIndex2 = 0;

        // Traverse the list to find the nodes corresponding to index1 and index2
        while (currentNode1 && currentIndex1 < index1) {
            currentNode1 = currentNode1.next;
            currentIndex1++;
        }
        while (currentNode2 && currentIndex2 < index2) {
            currentNode2 = currentNode2.next;
            currentIndex2++;
        }

        // If either index is out of bounds or nodes are not found
        if (!currentNode1 || !currentNode2) {
            return;
        }

        // Swap the data of the nodes
        let temp = currentNode1.data;
        currentNode1.data = currentNode2.data;
        currentNode2.data = temp;
    }
    

    nodeAt(index) {
            // If the index is negative or the list is empty
        if (index < 0 || !this.head) {
            console.log("Invalid index or empty list");
            return;
        }

        let currentNode = this.head;
        let currentIndex = 0;

        // Traverse the list to find the node at the specified index
        while (currentNode && currentIndex < index) {
            currentNode = currentNode.next;
            currentIndex++;
        }

        // If the index is out of bounds
        if (!currentNode) {
            console.log("Index out of bounds");
            return;
        }

        // Output the data of the node at the specified index
        console.log(`Data at index ${index}:
            node: ${currentNode.data}
                -----------
                    prev: ${currentNode.prev?.data}
                    next: ${currentNode.next?.data}`);

                    return currentNode;

    }

    first() {
        console.log(`
            node: ${this.head.data}
                -----------
                    prev: ${this.head.prev?.data}
                    next: ${this.head.next?.data}`);

                    return this.head;
    }

    last() {
        console.log(`
            node: ${this.tail.data}
                -----------
                    prev: ${this.tail.prev?.data}
                    next: ${this.tail.next?.data}`);

                    return this.tail;
    }

    clear() {
        this.head = null;
        this.tail = null;
        console.log("The list is now cleared")
    }

}

const ll = new linkedList();
console.log(ll);
console.log(node1);