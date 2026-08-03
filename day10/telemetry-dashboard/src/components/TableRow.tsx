import { memo } from "react";
import type { TableRowProps } from "../types";


const TableRow = memo(({ sensor, handleSelect }: TableRowProps) => {
    // console.log(sensor) //used to test for the rendering
    return <tr onClick={() => handleSelect(sensor.id)}>
        <td>{sensor.name}</td>
        <td>{sensor.temperature}</td>
        <td>{sensor.threshold}</td>
        <td>{sensor.status}</td>
        <td>{sensor.updatedAt}</td>
    </tr>
})

export default TableRow;