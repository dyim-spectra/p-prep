import type { TableProps } from "../api";
import Row from "./Row";


const Table = ({ vehicles, now, handleSelect, selectedId }: TableProps) => {

    return (
        <table>
            <thead>
                <tr>
                    <th>vehicleId</th>
                    <th>x</th>
                    <th>y</th>
                    <th>timestamp</th>
                    <th>stale</th>
                </tr>
            </thead>
            <tbody>
                {vehicles.map(vehicle => {
                    return <Row key={vehicle.vehicleId} vehicle={vehicle} now={now} handleSelect={handleSelect} selectedId={selectedId}/>
                })}
            </tbody>
        </table >
    )

}

export default Table;