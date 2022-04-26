import React from "react";

function Search() {
  return (
    <div className="search-container">
      <label htmlFor="search-bar">Search for accommodation:</label>
      <input type="text" placeholder="Search.." id="search-bar"></input>
    </div>
  );
}

export default Search;
