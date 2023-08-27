import React from "react";

export const SearchBar = ({ location, handleSearch, searchLocation }) => {
  return (
    <div className="mb-4 relative rounded-full overflow-hidden">
      <input
        type="text"
        className="block w-full py-2 px-3  bg-white rounded-full focus:outline-none border dark:border-transparent dark:bg-[#1a1a1b] dark:text-white"
        value={location}
        onChange={handleSearch}
        onKeyPress={searchLocation}
        placeholder="Enter Location"
      />
    </div>
  );
};
