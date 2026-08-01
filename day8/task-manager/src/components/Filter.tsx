import { memo } from "react";
import type { FilterProps } from "../types";


const Filter = memo(({ filter, handleFilter }: FilterProps) => {
    console.log('filter')
    return (<select value={filter} onChange={e => handleFilter(e.target.value as "completed" | "incomplete" | "all")}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
    </select>)

})

export default Filter;