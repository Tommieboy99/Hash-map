// Use the following snippet whenever you access a bucket through an index.
// We want to throw an error if we try to access an out-of-bounds index:
// if (index < 0 || index >= buckets.length) {
//  throw new Error("Trying to access index out of bounds");
// }

import { LinkedList, Node } from 'src/linkedlist.js';

class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(capacity);
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
    const keyHash = this.hash(key);
    const bucket = this.buckets[keyHash];

    if (!bucket) {
      const list = new LinkedList();
      list.append(key, value);
    }

    if (bucket) {
      console.log('yes!');
    }
    // If a key already exists, then the old value is overwritten, and we can say that we update the key’s value
    // (e.g. Carlos is our key but it is called twice: once with value I am the old value., and once with value I am the new value..
    // Following this logic, Carlos should contain only the latter value).

    // Recall that collisions occur when TWO DIFFERENT keys generate the same hash code and get assigned to the same bucket. (e.g. Rama and Sita are both hashed to 3, so 3 becomes a location for Rama AND Sita. However, we know that this is not an update because the keys are different). Review the dealing with collisions section of the previous lesson to find a way to handle our collisions.
    // Remember to grow your buckets to double their capacity when your hash map reaches the load factor. The methods mentioned later in this assignment can help you handle the growth logic, so you may want to implement this feature near the end. However, we mention this with set() because it’s important to grow buckets exactly as they are being expanded.
  }
}

const map = new HashMap();
map.set('yes', 'no');
map.set('yes', 'no');

console.log(map);
