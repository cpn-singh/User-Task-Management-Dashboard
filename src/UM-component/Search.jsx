import React from "react"
import "../css/UmSearch.css"

const Search = ({ search, setSearch }) => {
  return (
    <div>
      <input 
        type="text" 
        placeholder="Search.." 
        aria-label="Search users by name, email, or role"
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        className="search-input" 
      />
    </div>
  )
}

export default Search