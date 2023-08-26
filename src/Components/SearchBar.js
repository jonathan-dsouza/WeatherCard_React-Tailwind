import React from "react";

export const SearchBar = ({ location, handleSearch, searchLocation }) => {
  return (
    <div className="relative rounded-full overflow-hidden">
      <input
        type="text"
        className="block w-full py-2 px-3  rounded-full focus:outline-none border dark:border-transparent"
        value={location}
        onChange={handleSearch}
        onKeyPress={searchLocation}
        placeholder="Enter Location"
      />
    </div>
  );
};
