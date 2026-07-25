/*
Group Anagrams

Given an array of strings strs, group the anagrams together. You can return the answer in any order.

Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

*/

const groupAnagrams = (s: string[]): string[][] => {
    const mapping: Record<string, string[]> = {}


    for (let i = 0; i < s.length; i++) {

        const sorted = s[i].split('').sort().join('');

        if(mapping[sorted]){
            mapping[sorted].push(s[i])
        }else {
            mapping[sorted] = [s[i]]
        }

    }
    return Object.values(mapping)
}


const groupAnagramsMapping = (s: string[]): string[][] => {
    const mapping = new Map<string, string[]>();

    for (const str of s) {
        const sorted = str.split('').sort().join('');
        const group = mapping.get(sorted) ?? [];
        group.push(str); //mutates the existing
        mapping.set(sorted, group);
    }

    return Array.from(mapping.values());
}
const strs = ["eat", "tea", "tan", "ate", "nat", "bat"];

console.log(
    groupAnagrams(strs)
)