import { useEffect, useState, useRef, } from 'react'
import { subscribeToPositions, type Position } from './api'
import Table from './components/Table';
import InputFilter from './components/InputFilter';

/*
Problem: Live Position Tracker

You're building a UI for an autonomous system control panel. You receive position updates for multiple vehicles over a WebSocket-like stream (simulated here with a function that calls a callback). Build a React component that:

Subscribes to a stream of position updates on mount, and unsubscribes on unmount.
Maintains a list of the latest known position for each vehicle (keyed by vehicleId).
Renders a list showing each vehicle's id, x, y, and lastUpdated timestamp.
If a vehicle hasn't sent an update in the last 5 seconds, show it as "STALE" (e.g., red text or a [STALE] tag).
*/



/*
Part 2: 
Problem: Selectable Vehicle Tracker

Extend the same idea, but now:

Clicking a vehicle's row selects it (only one vehicle selected at a time).
The selected row should be visually highlighted (e.g., different background color).
Add a text input that filters the vehicle list by vehicleId (case-insensitive substring match) as the user types.
If the currently selected vehicle gets filtered out by the search, it should stay selected in state (selection isn't cleared), but obviously won't be visible until the filter no longer excludes it.
*/

/*
Problem: Throttled Render for High-Frequency Updates

Imagine subscribeToPositions now fires very frequently — say, 60 times per second per vehicle (like a real telemetry feed for a 3D visualization). Re-rendering your whole table 60 times a second per vehicle would tank performance.

Modify your component so that:

Incoming position updates are still captured immediately (no data loss).
But the UI only re-renders at most once every 200ms, regardless of how fast updates come in — i.e., you throttle/batch the renders, not the data collection.
When a render does happen, it should reflect the latest known position for every vehicle at that moment (not an average, not every intermediate update — just the freshest snapshot).*/

function App() {
  const [vehicles, setVehicles] = useState<Map<string, Position>>(new Map());
  const [now, setNow] = useState(Date.now());
  const [selectedId, setSelectedId] = useState('');
  const [input, setInput] = useState('');

  const mapRef = useRef<Map<string, Position>>(vehicles)


  useEffect(() => {
    const unsubscribe = subscribeToPositions((pos) => {
      // setVehicles(prev => {
      //   const next = new Map(prev);
      //   next.set(pos.vehicleId, pos);
      //   return next;
      // });
      const next = new Map(mapRef.current);
      next.set(pos.vehicleId, pos);
      mapRef.current = next;
    });
    const interval = setInterval(() => setNow(Date.now()), 1000);
    const intervalVehicle = setInterval(() => setVehicles(mapRef.current), 200);

    return () => {
      unsubscribe()
      clearInterval(interval)
      clearInterval(intervalVehicle)
    };
  }, []);

  const handleSelect = (id: string) => {
    setSelectedId(id)
  }

  const handleInput = (search: string) => {
    setInput(search)
  }

  const filteredVehicles = [...vehicles.values()].filter(vehicle => {
    return vehicle.vehicleId.toLowerCase().includes(input.toLowerCase())
  })


  return (
    <>
      <InputFilter handleInput={handleInput} input={input} />
      <Table
        vehicles={filteredVehicles}
        now={now}
        handleSelect={handleSelect}
        selectedId={selectedId}
      />
    </>
  )
}

export default App
