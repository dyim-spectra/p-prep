import type { VehicleDetailsProps } from "../types";


const VehicleDetails = ({ vehicle }: VehicleDetailsProps) => {
    return <ul>
        <li>{vehicle.name}</li>
        <li>{vehicle.status}</li>
        <li>{vehicle.battery}</li>
        <li>{vehicle.latitude}</li>
        <li>{vehicle.longitude}</li>
    </ul>
}

export default VehicleDetails;