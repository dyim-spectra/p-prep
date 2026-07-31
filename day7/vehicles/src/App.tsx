import { useEffect, useMemo, useState } from 'react'
import type { Vehicle } from './types'
import Search from './components/Search'
import VehicleTable from './components/VehicleTable'
import VehicleDetails from './components/VehicleDetails'

function App() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [vehicles, setVehicles] = useState<Record<string, Vehicle>>({})
  const [search, setSearch] = useState('')
  const [selectedVehicleId, setSelectedVehicleId] = useState('')
  const [sortDir, setSortDir] = useState<'asc' | 'dsc' | null>(null)
  const [sortBy, setSortBy] = useState<keyof Vehicle | null>(null)


  useEffect(() => {
    const getVehicles = async () => {
      try {
        setLoading(true)
        const data = await mockApi();
        setVehicles(prev => {
          const next: Record<string, Vehicle> = {};

          for (const vehicle of data) {
            const existing = prev[vehicle.id];

            if (
              existing &&
              existing.id === vehicle.id &&
              existing.name === vehicle.name &&
              existing.status === vehicle.status &&
              existing.battery === vehicle.battery &&
              existing.latitude === vehicle.latitude &&
              existing.longitude === vehicle.longitude
            ) {
              next[vehicle.id] = existing;
            } else {
              next[vehicle.id] = vehicle;
            }
          }

          return next;
        });
      } catch {
        setError('there was an error')
      } finally {
        setLoading(false)
      }
    }

    getVehicles();
    const interval = setInterval(() => {
      getVehicles();
    }, 2000)

    return () => clearInterval(interval)


  }, [])

  const mockApi = () => {
    const delay = Math.random() * 200 + 200;
    return new Promise<Vehicle[]>(resolve => {
      setTimeout(() => {
        resolve([])
      }, delay)
    })
  }

  const derivedVehicles = useMemo(() => {
    return Object.values(vehicles).filter(vehicle => {
      const nameFound = vehicle.name.toLowerCase().includes(search.toLowerCase())
      const statusFound = vehicle.status.toLowerCase().includes(search.toLowerCase())
      return nameFound || statusFound
    }).sort((a, b) => {
      if (!sortBy) return 0;

      const aVal = a[sortBy];
      const bVal = b[sortBy];

      let comparison: number;
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        comparison = aVal.localeCompare(bVal);
      } else if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal;
      } else {
        comparison = 0; // fallback for mismatched/unsupported types
      }

      return sortDir === 'asc' ? comparison : -comparison;
    })


  }, [vehicles, search, sortBy, sortDir])

  const handleChange = (s: string) => {
    setSearch(s)
  }
  const handleSelect = (s: string) => {
    setSelectedVehicleId(s)
  }

  const handleSort = (s: keyof Vehicle) => {
    if (sortDir === 'dsc' && s === sortBy) {
      setSortDir(null)
      setSortBy(null)
    } else if (sortDir === 'asc' && s === sortBy) {
      setSortDir('dsc')
    } else if (s !== sortBy) {
      setSortDir('asc')
      setSortBy(s)
    }
  }



  return (
    <>
      <div>{loading ? 'fetching vehicles' : error ? error : 'latest vehicles'}</div>
      <Search search={search} handleChange={handleChange} />
      <VehicleTable
        vehicles={derivedVehicles}
        sortBy={sortBy}
        sortDir={sortDir}
        handleSelect={handleSelect}
        handleSort={handleSort} />
      {
        selectedVehicleId && vehicles[selectedVehicleId]
          ? <VehicleDetails vehicle={vehicles[selectedVehicleId]} />
          : null
      }
    </>
  )
}

export default App

/*
Build a page that displays:

A search input
A table of vehicles
A vehicle details panel
*/