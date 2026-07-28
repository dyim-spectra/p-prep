/*Problem

Given an array of integers, return the length of the longest consecutive sequence.

Example:

Input:
[100,4,200,1,3,2]

Output:
4

Explanation:
1,2,3,4

Requirements:

O(n) time
Don't sort the array.
*/

function longestConsecutive(nums: number[]): number {
    const set = new Set(nums);
    let count = 0

    for (let s of set) {
        const prev = s - 1;
        if (!set.has(prev)) {
            let c = 1;
            let next = s + 1;
            while (set.has(next)) {
                next++;
                c++;
            }
            count = Math.max(count, c)
        }
        
    }
    return count
};

//we need to convert the nums array into a Set and iterate through that Set. This prevent duplicate iterations. Also we dont want to iterate through things we've already iterated before so we need to add the condition where we will need to not exam every next unless it starts where there are no previous values. This again is to prevent dupliate iterations