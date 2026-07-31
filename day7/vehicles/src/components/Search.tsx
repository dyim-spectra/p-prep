import type { SearchProps } from "../types";


const Search = ({ search, handleChange }: SearchProps) => {
    return <input
        placeholder="search here"
        value={search}
        onChange={e => handleChange(e.target.value)}
    />
}

export default Search;