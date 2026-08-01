import { useState, useRef, memo, } from "react"
import type { SearchProps } from "../types"


const Search = memo(({ search, handleChange }: SearchProps) => {
    const [searchValue, setSearchValue] = useState(search)
    const timerRef = useRef(0)
    console.log('Search')
    const onChange = (str: string) => {
        setSearchValue(str)
        clearTimeout(timerRef.current)
        timerRef.current =setTimeout(() => {
            handleChange(str)
        }, 500)
    }

    return <input
        placeholder="search here"
        value={searchValue}
        onChange={e => onChange(e.target.value)}
    />
})

export default Search

/*
✅ title
✅ description
✅ priority (optional, since users might type "high")
*/