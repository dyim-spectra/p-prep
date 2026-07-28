

/*
Valid Parentheses

Given a string s containing just the characters (, ), {, }, [, ], determine if the input string is valid. A string is valid if:

Open brackets are closed by the same type of bracket.
Open brackets are closed in the correct order.
Every closing bracket has a corresponding open bracket of the same type.
Input: s = "([{}])"
Output: true

Input: s = "([)]"
Output: false  // brackets close out of order

Input: s = "(("
Output: false  // unclosed open brackets
*/

const validParentheses = (str: string): boolean => {
    let isValid = false;
    const stck = [];
    const closingPairs: Record<string, string> = {
        ')': '(',
        ']': '[',
        '}': '{'
    };

    /* if the string at i is an opening, add to the stck (stack). To determine if its an opening look at the closing pairs object. If key doesnt exist, it is an opening. this assumes that the value of the str parameter will always be either closing or openings. If this is a closing, look at the last element stck, verify that is a valid pair and pop from the stck array. If it is not a valid pair, exit from the loop early and return the isValid variable
*/
    for (let i = 0; i < str.length; i++) {
        if (closingPairs[str[i]] === undefined) {
            stck.push(str[i])
        } else if (closingPairs[str[i]]) {
            const lastElement = stck[stck.length - 1];
            if (lastElement === closingPairs[str[i]]) {
                stck.pop()
            } else {
                return false
            }
        }
    }

    if (stck.length === 0) isValid = true;
    return isValid;
}