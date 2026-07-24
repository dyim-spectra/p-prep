/*

Problem: Meeting Room Merge

You're given a list of meetings as (start, end) time intervals (in minutes since midnight), possibly overlapping and unsorted. Write a function that returns the merged list of busy intervals — i.e., collapse all overlapping or touching meetings into single continuous blocks.

Example:
[(30, 75), (0, 10), (60, 120), (95, 100)]
→ [(0, 10), (30, 120)]
*/

const meetingMerge = (intervals) => {
    if (intervals.length === 0) return [];
    if (intervals.length === 1) return [intervals[0]];
    const sorted = [...intervals].sort((a, b) => { return a[0] - b[0] }) //sorted
    //[ [ 0, 10 ], [ 30, 75 ], [ 60, 120 ], [ 95, 100 ] ]

    const res = [];
    let currentSpan = [...sorted[0]]

    for (let i = 1; i < sorted.length; i++) {
        if (sorted[i][0] > currentSpan[1]) {
            res.push(currentSpan)
            currentSpan = [...sorted[i]]
        } else {
            currentSpan[1] = Math.max(currentSpan[1], sorted[i][1])
        }
    }

    res.push(currentSpan)
    return res;
}

const meetings = [[30, 75], [0, 10], [60, 120], [95, 100]];

meetingMerge(meetings)
