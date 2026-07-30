/*
Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

Can you solve it without sorting?

 

Example 1:

Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
Example 2:

Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
 

Constraints:

1 <= k <= nums.length <= 105
-104 <= nums[i] <= 104
*/

function findKthLargest(nums: number[], k: number): number {
    let min: number = nums[0];
    for (let i = 1; i < nums.length; i++) {
        min = Math.min(min, nums[i]);
    }

    let arr = [];
    for (let i = 0; i < nums.length; i++) {
        const el = arr[nums[i] - min]
        if (el === undefined) {
            arr[nums[i] - min] = [nums[i]]
        } else {
            arr[nums[i] - min].push(nums[i])
        }
    }
 
    arr = arr.flat().filter(v => !isNaN(v)) 
    return arr[arr.length - k]
};