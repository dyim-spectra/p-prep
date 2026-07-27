import { useState, useEffect, useRef } from 'react'

type ApiResponse<T> = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};
type User = {
  id: number;
  firstName: string;
  lastName: string;
};


function App() {
  const [query, setQuery] = useState('');
  const [searchRes, setSearchRes] = useState<ApiResponse<User[]> | null>(null);


  useEffect(() => {
    const controller = new AbortController()

    const search = setTimeout(async () => {
      try {
        const response = await fetch(`https://dummyjson.com/users/search?q=${query}`, {
          signal: controller.signal
        });
        const data = await response.json()
        setSearchRes(data)
      } catch {
        console.log('there was an error')
      } finally {
        console.log('finall')
      }
    }, 300)


    return () => {
      clearTimeout(search);
      controller.abort()
    }


  }, [query])
  console.log(searchRes)
  return (
    <input placeholder='search here' value={query} onChange={e => setQuery(e.target.value)} />
  )
}

export default App


/*
Debounced Search Input

Build a component with a text input where:

As the user types, the input value updates immediately (no lag in what's shown in the box) — this should always feel instant and controlled.
An onSearch(query: string) callback (passed as a prop) should only fire 300ms after the user stops typing — not on every keystroke.
If the component unmounts while a debounce is pending, the pending call should be cancelled (no call after unmount).
typescript
type SearchInputProps = {
  onSearch: (query: string) => void;
};

// https://dummyjson.com/users/search?q=
*/