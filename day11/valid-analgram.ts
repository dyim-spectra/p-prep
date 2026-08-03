function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false;

    const counts: Record<string, number> = {};
    for (const char of s) counts[char] = (counts[char] ?? 0) + 1;
    for (const char of t) {
        if (!counts[char]) return false;
        counts[char]--;
    }
    return true;
}
//On

function isAnagramTwo(s: string, t: string): boolean {
    const sortedS = s.split('').sort().join('')
    const sortedT = t.split('').sort().join('')

    return sortedS === sortedT
};

//O(nlogn)