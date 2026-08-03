import { memo } from "react";
import type { TableProps } from "../types";
import TableRow from "./TableRow";


const Table = memo(({ sensors, handleSelect, handleSort, sortDir }: TableProps) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>name</th>
                    <th>temperature</th>
                    <th>threshold</th>
                    <th onClick={handleSort}>status {sortDir === 'asc' ? '↑' : sortDir === 'desc' ? '↓' : sortDir}</th>
                    <th>updatedAt</th>
                </tr>
            </thead>
            <tbody>
                {sensors.map(sensor => {
                    return <TableRow key={sensor.id} sensor={sensor} handleSelect={handleSelect} />
                })}
            </tbody>
        </table>
    )
})

export default Table;