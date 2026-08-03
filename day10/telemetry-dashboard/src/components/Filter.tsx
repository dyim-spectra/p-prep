import { memo } from "react";
import type { FilterProps } from "../types"


const Filter = memo(({handleFilter, statusFilter} : FilterProps) => {
    return (
        <select value={statusFilter} onChange={(e) => handleFilter(e.target.value as "Healthy" | "Warning" | "Critical" | "All")}>
            <option value='All'>All</option>
            <option value='Healthy'>Healthy</option>
            <option value='Warning'>Warning</option>
            <option value='Critical'>Critical</option>
        </select>
    )
})

export default Filter;