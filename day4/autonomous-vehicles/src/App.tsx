import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
    </>
  )
}

export default App

/*
Problem

We're building a dashboard that monitors autonomous vehicles.

The backend exposes this endpoint:

GET /vehicles

which returns

interface Vehicle {
    id: string;
    name: string;
    status: "ONLINE" | "OFFLINE" | "ERROR";
    battery: number;
}

Example:

[
    {
        id: "1",
        name: "Truck Alpha",
        status: "ONLINE",
        battery: 92
    },
    {
        id: "2",
        name: "Drone Bravo",
        status: "ERROR",
        battery: 15
    }
]
Build a page that

Displays

Search

Vehicle List

Vehicle Details

Requirements

✅ Fetch vehicles

✅ Loading state

✅ Error state

✅ Search by name

✅ Click a vehicle

✅ Show details

There is one additional requirement.

Every 2 seconds the backend returns an updated list of vehicles.

When the data refreshes:

preserve the selected vehicle
preserve the search text
avoid unnecessary rerenders
*/