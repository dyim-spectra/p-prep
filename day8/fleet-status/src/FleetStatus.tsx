// FleetStatus.tsx
/*
Your task, same as a live round:

Find and fix the bugs in the existing code (there are a few — some subtle).
New feature to add: a count summary above the list showing how many vehicles are in each status category (e.g., "Active: 3 · Idle: 2 · Offline: 1") that updates live as the filter/data changes.
*/

import { useState, useMemo } from 'react';

type Vehicle = {
  id: string;
  name: string;
  batteryLevel: number;
  status: 'active' | 'idle' | 'offline';
};

type FleetStatusProps = {
  vehicles: Vehicle[];
};


function FleetStatus({ vehicles }: FleetStatusProps) {
  const [filter, setFilter] = useState('all');

  const sortedVehicles = useMemo(
    () => [...vehicles].sort((a, b) => a.batteryLevel - b.batteryLevel),
    [vehicles]
  );

  const filteredVehicles = sortedVehicles.filter(v => {
    if (filter === 'all') return true;
    return v.status === filter;
  });

  const count: Record<string, number> = {
    'active': 0,
    'idle': 0,
    'offline': 0,
  }
  filteredVehicles.forEach(vehicle => {
    count[vehicle.status]++
  })

  return (
    <div>
      <div>Count </div>
      <div>Active: {count.active}</div>
      <div>Idle: {count.idle}</div>
      <div>Offline: {count.offline}</div>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="idle">Idle</option>
        <option value="offline">Offline</option>
      </select>

      <div>
        {filteredVehicles.map((vehicle, i) => (
          <div key={vehicle.id}>
            <span>{vehicle.name}</span>
            <span>{vehicle.batteryLevel}%</span>
            <span>{vehicle.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FleetStatus;