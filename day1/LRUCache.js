
/*
Let's go with LRU Cache — it's a classic that comes up constantly and maps well to real systems work.

Problem: LRU Cache

Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:

LRUCache(int capacity) — initialize the cache with a positive size capacity.
get(key) — return the value of the key if it exists, otherwise return -1. Accessing a key counts as "using" it (marks it as recently used).
put(key, value) — update the value of the key if it exists. Otherwise, add the key-value pair. If the number of keys exceeds capacity from this operation, evict the least recently used key.

Both get and put must run in O(1) average time complexity.

Example:

LRUCache cache = new LRUCache(2); // capacity = 2

cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // returns 1
cache.put(3, 3);    // evicts key 2
cache.get(2);       // returns -1 (not found)
cache.put(4, 4);    // evicts key 1
cache.get(1);       // returns -1 (not found)
cache.get(3);       // returns 3
cache.get(4);       // returns 4

Talk through your approach first — what data structures would give you O(1) for both operations? Then write the code (Python or TypeScript, your pick).
*/

class LRUCache {
    constructor(maxSize) {
        this.maxSize = maxSize
        this.cache = new Map()
    }

    get(k) {
        const getValue = this.cache.get(k)
        if(getValue === undefined) return -1
        this.cache.delete(k)
        this.cache.set(k, getValue)
        return getValue
    }

    put(k, v) {

        if (this.cache.has(k)) {
            this.cache.delete(k)
        } else if (this.cache.size >= this.maxSize) {
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }


        this.cache.set(k, v)
    }

}