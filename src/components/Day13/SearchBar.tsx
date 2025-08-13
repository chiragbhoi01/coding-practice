import  { useState } from "react";
import Card from "./Card";

type searchType = {
    onSearchChange :(serachValue : string) => void
}
function SearchBar({
    onSearchChange
} : searchType) {
  

  return (
    <div>
      <div>
        <input
          type="text"
          name="search"
          placeholder="search users........"
          className="border-2 rounded-2xl p-2"
          
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
    </div>
  );
}

export default SearchBar;
