function climbStairs(n: number): number {
    // first attempt: 
    // if(n <= 2) return n;
    // return climbStairs(n-1) + climbStairs(n-2);

    // second attempt:
    let memo: number[] = [];
    for (let i = 0; i <= n; i++) {
        if (i <= 2) {
            memo.push(i);
        } else {
            const sum: number = memo[i - 1] + memo[i - 2];
            memo.push(sum);
        }
    }
    return memo[n];
};

/*
You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

 

Example 1:

Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
Example 2:

Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
 

Constraints:

1 <= n <= 45
*/
