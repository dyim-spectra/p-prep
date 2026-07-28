
class HitCounter {
    private hits: Map<number, number>;
    constructor() {
        this.hits = new Map();
    }

    hit(timestamp: number) {
        this.hits.set(timestamp, (this.hits.get(timestamp) ?? 0) + 1)
    }


    getHits(timestamp: number) {
        let count = 0
        for (let i = timestamp - 299; i <= timestamp; i++) {
            count += this.hits.get(i) ?? 0;
        }
        return count;
    }
}


/*
Problem

Implement a data structure called HitCounter.

const counter = new HitCounter();

counter.hit(1);
counter.hit(2);
counter.hit(3);

counter.getHits(4); // 3

counter.hit(300);

counter.getHits(300); // 4

counter.getHits(301); // 3

The counter should return the number of hits received in the last 300 seconds (5 minutes).

Assume timestamps are:

increasing
measured in seconds
integer values

Implement:

class HitCounter {
    hit(timestamp: number): void;

    getHits(timestamp: number): number;
}
Requirements

Try to make both operations efficient.
*/