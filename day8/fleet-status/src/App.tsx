import { useState } from 'react'
import FleetStatus from './FleetStatus'
import VehicleDetailPanel from './VehicleDetailPanel';
const vehicles: Vehicle[] = [
  { id: 'v1', name: 'Scout Alpha', batteryLevel: 82, status: 'active' },
  { id: 'v2', name: 'Scout Bravo', batteryLevel: 15, status: 'idle' },
  { id: 'v3', name: 'Recon Charlie', batteryLevel: 47, status: 'active' },
  { id: 'v4', name: 'Recon Delta', batteryLevel: 0, status: 'offline' },
  { id: 'v5', name: 'Perimeter Echo', batteryLevel: 63, status: 'idle' },
];
type Vehicle = {
  id: string;
  name: string;
  batteryLevel: number;
  status: 'active' | 'idle' | 'offline';
};

type VehicleDetail = {
  id: string;
  name: string;
  battery: number;
  lastMaintenance: string;
};


function App() {
  const [vehicleId, setVehicleId] = useState<string | null>(null)
  const fetchVehicleDetail = (id: string): Promise<VehicleDetail> => {
  const delay = Math.random() * 1500 + 200;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.15) {
        reject(new Error('Failed to fetch vehicle detail'));
        return;
      }
      resolve({
        id,
        name: `Vehicle ${id}`,
        battery: Math.floor(Math.random() * 100),
        lastMaintenance: '2026-06-15',
      });
    }, delay);
  });
};

  return (
    <>
    <FleetStatus vehicles={vehicles} />
    <VehicleDetailPanel vehicleId={vehicleId} fetchVehicleDetail={fetchVehicleDetail}/>
    </>
  )
}

export default App