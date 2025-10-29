export { LinkedList };

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(key, value) {
    const newNode = new Node(key, value);
    if (!this.head) this.head = newNode;
    else this.tail.nextNode = newNode;
    this.tail = newNode;
  }

  updateKeyValue(key, value) {
    let current = this.head;

    while (current) {
      if (current.key === key) {
        current.value = value;
        return;
      }
      current = current.nextNode;
    }
  }

  getValueOfKey(key) {
    let current = this.head;

    while (current !== null) {
      if (current.key === key) return current.value;
      current = current.nextNode;
    }

    return null;
  }

  doesKeyExist(key) {
    let current = this.head;

    while (current !== null) {
      if (current.key === key) return true;
      current = current.nextNode;
    }

    return false;
  }

  removeNode(key) {
    let prev = null;
    let current = this.head;

    while (current) {
      if (current.key === key) {
        if (!prev) this.head = current.nextNode;
        else prev.nextNode = current.nextNode;
        if (!current.nextNode) this.tail = prev;

        return true;
      }

      prev = current;
      current = current.nextNode;
    }

    return false;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  getKeys() {
    const keys = [];

    let current = this.head;

    while (current !== null) {
      keys.push(current.key);
      current = current.nextNode;
    }

    return keys;
  }

  getValues() {
    const values = [];

    let current = this.head;

    while (current !== null) {
      values.push(current.value);
      current = current.nextNode;
    }

    return values;
  }

  getKeyValuePair() {
    const pairs = [];

    let current = this.head;

    while (current !== null) {
      pairs.push([current.key, current.value]);
      current = current.nextNode;
    }

    return pairs;
  }
}

class Node {
  constructor(key, value = null, nextNode = null) {
    if (key === undefined || key === null) {
      throw new Error('Node key is required');
    }
    this.key = key;
    this.value = value;
    this.nextNode = nextNode;
  }
}
