import { memo } from "react"
import type { TableRowProps } from "../types"


const TableRow = memo(({
    vehicle,
    handleSelect
}: TableRowProps) => {
    return (
        <tr onClick={() => handleSelect(vehicle.id)}>
            <td>{vehicle.title}</td>
            <td>{vehicle.description}</td>
            <td>{vehicle.priority}</td>
            <td>{`${vehicle.completed}`}</td>
            <td>{vehicle.updatedAt}</td>
        </tr>
    )
})

export default TableRow