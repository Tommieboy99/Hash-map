export { LinkedList, Node };

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  append(key, value) {
    const newNode = new Node(key, value);
    if (!this.head) this.head = newNode;
    else this.tail.nextNode = newNode;
    this.tail = newNode;
    this._size++;
  }

  prepend(value) {
    const newNode = new Node(value, this.head);
    if (!this.head) this.tail = newNode;
    this.head = newNode;
    this._size++;
  }

  get size() {
    return this._size;
  }

  get listHead() {
    return this.head;
  }

  get listTail() {
    return this.tail;
  }

  at(index) {
    let count = 0;
    let current = this.head;

    while (current !== null) {
      if (index === count) {
        return current;
      }

      count++;
      current = current.nextNode;
    }

    return null;
  }

  pop() {
    if (!this.head) return null;
    if (!this.head.nextNode) {
      this.head = null;
      this.tail = null;
    }

    let current = this.head;

    while (current.nextNode.nextNode) {
      current = current.nextNode;
    }

    current.nextNode = null;
    this.tail = current;
  }

  contains(value) {
    let current = this.head;

    while (current !== null) {
      if (current.value === value) return true;
      current = current.nextNode;
    }

    return false;
  }

  find(value) {
    let current = this.head;
    let index = 0;

    while (current !== null) {
      if (current.value === value) return index;
      index++;
      current = current.nextNode;
    }

    return null;
  }

  toString() {
    let result = '';
    let current = this.head;
    while (current !== null) {
      result += `( ${current.value} ) -> `;
      current = current.nextNode;
    }
    result += 'null';
    return result;
  }
}

class Node {
  constructor(key = null, value = null, nextNode = null) {
    this.key = key;
    this.value = value;
    this.nextNode = nextNode;
  }
}
