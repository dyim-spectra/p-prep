/*
Let's step up to a true medium — this one's a sliding-window problem, a very common pattern in interviews.

Longest Substring Without Repeating Characters

Given a string s, find the length of the longest substring without repeating characters.

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with length 3.

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with length 1.

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with length 3. Note "pwke" is not a substring, it's a subsequence.
*/

/*
keep adding to the set, moving the right pointer by one, until we get to a char exists in the set. This is what im going to call the conflict. this is where the left pointer gets used. Left starts at 0. Continue to remove chars from the set, increasing the left pointer by 1 until we get to a point there the char being removed. now we can continue to move the right point by 1 until the conflict re-occurs OR the right pointers has checked everything. return the max set.size
*/
function lengthOfLongestSubstring(s: string): number {
    const set = new Set<string>();
    let maxSize = 0;
    let left = 0;

    for (let i = 0; i < s.length; i++) {
        while (set.has(s[i])) {
            set.delete(s[left]);
            left++;
        }
        set.add(s[i]);
        maxSize = Math.max(maxSize, set.size);
    }

    return maxSize;
};