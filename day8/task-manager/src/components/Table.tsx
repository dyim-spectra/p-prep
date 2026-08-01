import type { TableProps } from "../types"
import TableRow from "./TableRow"


const Table = ({
    vehicles,
    sortCol,
    sortOrderBy,
    handleSelect,
    handleOrder
}: TableProps) => {
    return (
        <table>
            <thead>
                <tr>
                    <th onClick={() => handleOrder('title')}>title {sortCol === 'title' ? sortOrderBy : ''}</th>
                    <th>description</th>
                    <th onClick={() => handleOrder('priority')}>priority {sortCol === 'priority' ? sortOrderBy : ''}</th>
                    <th>completed</th>
                    <th>updatedAt</th>
                </tr>
            </thead>
            <tbody>
                {vehicles.map(vehicle => {
                    return <TableRow key={vehicle.id} vehicle={vehicle} handleSelect={handleSelect} />
                })}
            </tbody>
        </table>
    )
}

export default Table