import type { VehicleTableProps } from "../types";
import VehicleRow from "./VehicleRow";


const VehicleTable = ({ vehicles, sortBy, sortDir, handleSelect, handleSort }: VehicleTableProps) => {

    const showSort = (name: string) => {
        if (sortBy === name) {
            if (sortDir === 'asc') {
                return ' ↑'
            } else if (sortDir === 'dsc') {
                return ' ↓'
            } else {
                return ''
            }
        }
    }

    return <table>
        <thead>
            <tr>
                <th onClick={() => handleSort('name')}>name {showSort('name')}</th>
                <th onClick={() => handleSort('status')}>status {showSort('status')}</th>
                <th>battery</th>
                <th>latitude</th>
                <th>longitude</th>
            </tr>
        </thead>
        <tbody>
            {vehicles.map(vehicle => {
                return <VehicleRow key={vehicle.id} handleSelect={handleSelect} vehicle={vehicle} />
            })}
        </tbody>
    </table>

}

export default VehicleTable;