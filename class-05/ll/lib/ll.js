'use strict';

const Node = require('./node');

class LinkedList {
  constructor(){
    this.head = null;
  }

  insert(value) {
    // insert a node at the beginning of a list

    // two options:
    // 1. the list is empty
      // make a new Node with the value given
    // const node = new Node(value);
    //   // assign this.head to that new node
    // this.head = node;
    
    // 2. the list is NOT empty
      // make a new Node with the value given
      const node = new Node(value);
      // make the new Node's .next point at the current head
      node.next = this.head;
      // reassign the head to the new node
      this.head = node;
  }

  append(value) {
    const node = new Node(value);
    // traverse the entire list until I find the one whose next is null

    let currentNode = this.head;
    while(currentNode.next !== null){
      currentNode = currentNode.next;
    }
    // when I find that one, make the next my new node
    currentNode.next = node;

    // make my new node's next null - already done

  }
}

module.exports = LinkedList;