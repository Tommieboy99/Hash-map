// Use the following snippet whenever you access a bucket through an index.
// We want to throw an error if we try to access an out-of-bounds index:
// if (index < 0 || index >= buckets.length) {
//  throw new Error("Trying to access index out of bounds");
// }

import { LinkedList } from './linkedlist.js';

class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(capacity);
    this._size = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    let bucket = this.buckets[index];

    if (!bucket) {
      bucket = new LinkedList();
      this.buckets[index] = bucket;
    }

    if (bucket.doesKeyExist(key)) {
      bucket.updateKeyValue(key, value);
    } else {
      bucket.append(key, value);
      this._size++;
    }

    if (this._size >= this.capacity * this.loadFactor) {
      this._resize();
    }
  }

  get(key) {
    const index = this.hash(key);

    const bucket = this.buckets[index];
    if (!bucket) return null;

    let value = bucket.getValueOfKey(key);

    return value;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (!bucket) return false;
    return bucket.doesKeyExist(key);
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    if (!bucket) return false;

    const removed = bucket.removeNode(key);
    if (removed) this._size--;
    return removed;
  }

  get length() {
    return this._size;
  }

  clear() {
    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];
      if (bucket) bucket.clear();
    }

    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = new Array(this.capacity);
    this._size = 0;
  }

  keys() {
    let keyArr = [];

    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];
      if (bucket) {
        const keys = bucket.getKeys();
        keyArr.push(...keys);
      }
    }

    return keyArr;
  }

  values() {
    let valueArr = [];

    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];
      if (bucket) {
        const values = bucket.getValues();
        valueArr.push(...values);
      }
    }

    return valueArr;
  }

  entries() {
    let keyValueArr = [];

    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];
      if (bucket) {
        const keyValuePairs = bucket.getKeyValuePair();
        keyValueArr.push(...keyValuePairs);
      }
    }

    return keyValueArr;
  }

  _resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity);
    this._size = 0;

    for (const bucket of oldBuckets) {
      if (!bucket) continue;
      let current = bucket.head;
      while (current) {
        const index = this.hash(current.key);
        let newBucket = this.buckets[index];
        if (!newBucket) {
          newBucket = new LinkedList();
          this.buckets[index] = newBucket;
        }
        newBucket.append(current.key, current.value);
        this._size++;
        current = current.nextNode;
      }
    }
  }
}
