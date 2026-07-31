import type { VehicleRowProps, } from "../types";


const VehicleRow = ({ vehicle, handleSelect }: VehicleRowProps) => {
    return <tr onClick={() => handleSelect(vehicle.id)}>
        <td>{vehicle.name}</td>
        <td>{vehicle.status}</td>
        <td>{vehicle.battery}</td>
        <td>{vehicle.latitude}</td>
        <td>{vehicle.longitude}</td>
    </tr>
}

export default VehicleRow;