import { memo, useEffect, useRef, useState } from "react"
import type { SearchProps } from "../types"


const Search = memo(({ handleSearch, searchValue }: SearchProps) => {
    const [inputValue, setInputValue] = useState(searchValue)
    const timeOutRef = useRef(0)

    useEffect(() => {
        setInputValue(searchValue)
    }, [searchValue])

    const onChange = (str: string) => {
        setInputValue(str);
        clearTimeout(timeOutRef.current)
        timeOutRef.current = setTimeout(() => {
            handleSearch(str)
        }, 500)
    }

    return <input value={inputValue} onChange={(e) => onChange(e.target.value) } placeholder="search name here..."/>

})

export default Search;