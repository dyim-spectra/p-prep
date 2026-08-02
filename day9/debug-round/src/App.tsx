import { useState } from 'react'
import MapMarkers from './MapMarkers'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MapMarkers
        markers={[]}
        centerLat={1}
        centerLng={1} />
    </>
  )
}

export default App
