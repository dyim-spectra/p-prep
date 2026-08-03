import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import type { Telemetry } from './types';
import { getTelemetry, updateThreshold } from './api';
import Search from './components/Search';
import Table from './components/Table';
import Details from './components/Details';
import Filter from './components/Filter';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('')
  const [sensorList, setSensorList] = useState<Record<Telemetry['id'], Telemetry>>({})
  const [selectedSensorId, setSelectedSensorId] = useState('')
  const [statusFilter, setStatusFilter] = useState<"Healthy" | "Warning" | "Critical" | "All">('All')
  const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>(null)
  const [searchValue, setSearchValue] = useState('')
  const pollCount = useRef(0)

  useEffect(() => {
    telemetry(); // initialfetch
    //fetch ever 2 seconds
    const interval = setInterval(() => {
      telemetry()
    }, 2000)
    return () => clearInterval(interval)
  }, [])


  const telemetry = async () => {
    setError('')
    try {
      const count = pollCount.current + 1
      pollCount.current = count
      const data = await getTelemetry()

      if (pollCount.current === count) {
        setSensorList(prev => {
          const list: Record<string, Telemetry> = {}
          data.forEach(d => {
            if (d.updatedAt === prev[d.id]?.updatedAt) {
              list[d.id] = prev[d.id]
            } else {
              list[d.id] = d
            }
          })
          return list;
        })
      }

    } catch {
      setError('there was an error getting telemetry')
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = useCallback((id: string) => {
    setSelectedSensorId(id);
  }, []);

  const handleSearch = useCallback((str: string) => {
    setSearchValue(str);
  }, []);

  const handleFilter = useCallback((str: "Healthy" | "Warning" | "Critical" | "All") => {
    setStatusFilter(str);
  }, []);

  const handleSort = useCallback(() => {
    setSortDir(prev => {
      if (!prev) {
        return 'asc'
      } else if (prev === 'asc') {
        return 'desc'
      }
      return null
    });
  }, []);

  const handleUpdateThreshold = useCallback(async (num: number) => {
    let prevThreshold: number;
    setSensorList(prev => {
      const target = prev[selectedSensorId];
      if (!target) return prev;
      prevThreshold = prev[selectedSensorId].threshold;
      return {
        ...prev,
        [selectedSensorId]: { ...target, threshold: num }
      }
    })

    try {
      const success = await updateThreshold(selectedSensorId, num);
      if (!success) {
        throw Error
      }

    } catch {
      setError(`there was an error setting threshold for vehicle: ${selectedSensorId}`)
      setSensorList(prev => {
        const target = prev[selectedSensorId];
        return {
          ...prev,
          [selectedSensorId]: { ...target, threshold: prevThreshold }
        }
      })
    }



  }, [selectedSensorId]);


  const selectedVehicle = useMemo(() => {
    return sensorList[selectedSensorId]
  }, [selectedSensorId, sensorList])

  const filteredSensorList = useMemo(() => {
    return Object.values(sensorList)
      .filter(sensor => {
        const includesName = sensor.name.toLowerCase().includes(searchValue.toLowerCase())
        return includesName
      })
      .filter(sensor => {
        if (statusFilter !== "All") {
          return sensor.status === statusFilter;
        } else {
          return true;
        }
      })
      .sort((a, b) => {
        if (!sortDir) return 0;
        // const priorityRank: Record<Telemetry['status'], number> = {
        //   Healthy: 0,
        //   Warning: 1,
        //   Critical: 2,
        // };

        // let comparison = priorityRank[a.status] - priorityRank[b.status];
        const comparison = a.temperature - b.temperature;


        return sortDir === 'asc' ? comparison : -comparison;
      });
  }, [sensorList, statusFilter, sortDir, searchValue,]);

  if (loading) return <div>Loading...</div>

  return (
    <div style={{ display: 'flex' }}>
      <div>
        {error && <div>Error: {error}</div>}
        <Search searchValue={searchValue} handleSearch={handleSearch} />
        <Filter statusFilter={statusFilter} handleFilter={handleFilter} />
        <Table handleSort={handleSort} handleSelect={handleSelect} sensors={filteredSensorList} sortDir={sortDir} />
      </div>
      {selectedVehicle && <Details key={selectedVehicle.id} sensor={selectedVehicle} handleUpdateThreshold={handleUpdateThreshold} />}

    </div>
  )
}

export default App

/*
Scenario
We're building an internal operations dashboard.
The backend returns a list of telemetry sensors every 2 seconds.
Each sensor has:

type Sensor = {
  id: string;
  name: string;
  temperature: number;
  status: "Healthy" | "Warning" | "Critical";
  threshold: number;
};

Requirements
Build a page with:
* Search by name
* Sort by temperature
* Filter by status
* Sensor table
* Sensor details panel
* Ability to edit the threshold
* Poll every 2 seconds
* Preserve the selected sensor
* Avoid unnecessary rerenders
* Scale to 100,000 sensors
*/