import React, { useState } from 'react';

function Searchevn({ handleSearch }) {
  const [searchInput, setSearchInput] = useState('');

  const onSearch = () => {
    handleSearch(searchInput);
  };

  return (
    <div className="mt-4">
      <h1 className="text-lg font-semibold mb-2">Search Events:</h1>
      <input
        type="text"
        placeholder="Search events..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-2"
      />
      <button
        onClick={onSearch}
        className="py-2 px-4 rounded-3xl bg-[#009086] text-white font-semibold w-1/2"
      >
        Search
      </button>
    </div>
  );
}

export default Searchevn;
