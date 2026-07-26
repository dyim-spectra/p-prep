import type { RowProps } from "../api";

const Row = ({ vehicle, now, handleSelect, selectedId, }: RowProps) => {
    return <tr
        onClick={() => handleSelect(vehicle.vehicleId)}
        style={{ backgroundColor: selectedId === vehicle.vehicleId ? 'yellow' : undefined }}
    >
        <td>{vehicle.vehicleId}</td>
        <td>{vehicle.x}</td>
        <td>{vehicle.y}</td>
        <td>{vehicle.timestamp}</td>
        <td style={{ color: 'red' }}>
            {now - vehicle.timestamp > 5000 ? 'Stale' : ''}
        </td>
    </tr>
}

export default Row;