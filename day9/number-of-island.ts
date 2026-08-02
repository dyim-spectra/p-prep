function numIslands(grid: string[][]): number {
    let count = 0; //the crux of the problem is only add to the count when any island is discovered. 
    //if any island is discovered at all, increment the count. once discovered, start examining its adjucement areas. 

    const examineIslandArea = (y: number, x: number) => {
        /*x will represent going left to right
        y will represent going top to bottom
        */
        //if at all we go out of bounds, return
        //if the sqaure was visited, return
        //if the sqaure is water, return (no point examining neighbors)
        if (
            x < 0 ||
            x >= grid[y]?.length ||
            y < 0 ||
            y >= grid.length ||
            grid[y][x] === 'visited' ||
            grid[y][x] === '0'
        ) {
            return
        }

        grid[y][x] = 'visited'; //mark the square as visited

        //now examine all the other surrounding areas until 
        examineIslandArea(y, x - 1) //left
        examineIslandArea(y, x + 1) //right
        examineIslandArea(y - 1, x) //top 
        examineIslandArea(y + 1, x) //down


    }
    //from top to bottom
    for (let y = 0; y < grid.length; y++) {
        // from left to right
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === '1') {
                count++;
                examineIslandArea(y, x)
            }
        }
    }

    return count;
};

/*
Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

 

Example 1:

Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
Example 2:

Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 300
grid[i][j] is '0' or '1'.
*/