import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { mockApi } from './api'
import type { Task } from './types';
import Table from './components/Table';
import Selected from './components/Selected';
import Search from './components/Search';
import Filter from './components/Filter';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [vehicles, setVehicles] = useState<Record<string, Task>>({})
  const [selectedId, setSelectedId] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'completed' | 'incomplete' | 'all'>('all');
  const [sortCol, setSortCol] = useState<keyof Task | null>(null);
  const [sortOrderBy, setSortOrderBy] = useState<'asc' | 'desc' | null>(null);

  const callCount = useRef(0)
  useEffect(() => {

    const fetch = async () => {
      setLoading(true);
      setError('');
      const currentCount = callCount.current + 1;
      callCount.current = currentCount;
      try {


        const data: Task[] = await mockApi();
        if (currentCount === callCount.current) {
          setVehicles(prev => {
            const res: Record<string, Task> = {}
            data.forEach((v: Task) => {
              const prevUpdated = prev[v.id]?.updatedAt
              const notChanged = prevUpdated === v.updatedAt;
              if (notChanged) {
                res[v.id] = prev[v.id]
              } else {
                res[v.id] = v
              }
            })
            return res;
          })
        }


      } catch {
        if (currentCount === callCount.current) {
          setError('there was an error')
        }
      } finally {
        if (currentCount === callCount.current) {
          setLoading(false)
        }
      }

    }
    fetch(); // initialfetch

    //fetch ever 2 seconds
    const interval = setInterval(() => {
      fetch()
    }, 2000)

    return () => clearInterval(interval)

  }, [])

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleChange = useCallback((str: string) => {
    setSearch(str);
  }, []);

  const handleFilter = useCallback((str: 'completed' | 'incomplete' | 'all') => {
    setFilter(str);
  }, []);

  const handleOrder = useCallback((col: keyof Task | null) => {
    if (col !== sortCol) {
      setSortCol(col)
      setSortOrderBy('asc')
    } else if (col === sortCol && sortOrderBy === 'asc') {
      setSortCol(col)
      setSortOrderBy('desc')
    } else {
      setSortCol(null)
      setSortOrderBy(null)
    }
  }, [sortCol, sortOrderBy]);

  const selectedVehicle = useMemo(() => {
    return vehicles[selectedId]
  }, [selectedId, vehicles])

  const filteredTasks = useMemo(() => {
    return Object.values(vehicles)
      .filter(vehicle => {

        const includesTitle = vehicle.title.toLowerCase().includes(search.toLowerCase())
        const includesDesc = vehicle.description.toLowerCase().includes(search.toLowerCase())
        const includesPriority = vehicle.priority.toLowerCase().includes(search.toLowerCase())
        return includesTitle || includesDesc || includesPriority
      })
      .filter(vehicle => {
        if (filter === "completed") return vehicle.completed;
        if (filter === "incomplete") return !vehicle.completed;
        return true;
      })
      .sort((a, b) => {
        if (!sortCol || !sortOrderBy) return 0;
        const priorityRank: Record<Task['priority'], number> = {
          Low: 0,
          Medium: 1,
          High: 2,
        };

        let comparison = 0

        if (sortCol === 'priority') {
          comparison = priorityRank[a.priority] - priorityRank[b.priority];
        } else if (sortCol === 'title') {
          comparison = a.title.localeCompare(b.title);
        }
        return sortOrderBy === 'asc' ? comparison : -comparison;
      });
  }, [vehicles, search, sortCol, sortOrderBy]);

  return (
    <>
      <div>{loading ? 'loading' : error ? 'error' : `As of ${new Date().toISOString()}`}</div>
      <Search
        search={search}
        handleChange={handleChange}
      />
      <Filter filter={filter} handleFilter={handleFilter} />
      <Table
        vehicles={filteredTasks}
        sortCol={sortCol}
        sortOrderBy={sortOrderBy}
        handleSelect={handleSelect}
        handleOrder={handleOrder}
      />
      {selectedVehicle && <Selected vehicle={selectedVehicle} />}
    </>
  )
}

export default App

/*
UI
---------------------------------
Search

Completed | Incomplete | All

Title ↑↓

Priority ↑↓

-----------------------------

Task List

-----------------------------

Task Details

Requirements
Search
Filter (All / Completed / Incomplete)
Sort (Title / Priority)
Preserve selected task
Preserve search/filter/sort
Loading
Error
Poll every second
Handle 50K tasks
Avoid unnecessary rerenders


  id: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
  updatedAt: string;
*/