
function longestCommonPrefix(strs: string[]): string {

    let longest = strs[0];
    
    for(let i = 1; i < strs.length; i++){
        if(!longest){ return longest }

        let temp = '';
        for(let j = 0; j< longest.length;j++){
            if(longest[j] === strs[i][j]){
                temp += strs[i][j];
            } else {
                break;
            }
        }

        longest = temp;
    }

    return longest;
    
};

/*

Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

 

Example 1:

Input: strs = ["flower","flow","flight"]
Output: "fl"
Example 2:

Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.

Constraints:

1 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] consists of only lowercase English letters if it is non-empty.
*/