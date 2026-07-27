/*
Two Sum

Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target. You may assume exactly one solution exists, and you may not use the same element twice.

Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]  // because nums[0] + nums[1] == 9

Try to do better than the brute-force O(n²) approach (checking every pair) if you can — think about what data structure would let you look up "have I seen the number I need before?" in O(1).
*/


const twoSum = (numbers: number[], target: number): number[] => {
    const map: Record<string, number> = {}

    for (let i = 0; i < numbers.length; i++) {
        console.log(map)
        if (map[numbers[i]] !== undefined) {
            return [map[numbers[i]], i]
        } else {
            map[target - numbers[i]] = i
        }
    }

    return []

}


const nums = [2, 7, 11, 15];

console.log(
    twoSum(nums, 9)
)