import React, { useState } from 'react'
import Searchevn from './Searchevn';
function Filterevn({ type, handletype, handlecity, handleSearch }) {
  const [cityInput, setCityInput] = useState('');

  return (
    <div className='bg-white h-fit w-full rounded-xl p-5 shadow-xl'>
      <p className='text-lg font-semibold mb-4'>Filter by:</p>
      <div className='grid grid-cols-2 gap-2'>
        <button className={`py-2 px-4 rounded-3xl ${type === 'All' ? 'bg-gray-400' : 'bg-[#009086]'} text-white hover:bg-gray-400`} onClick={() => { handletype('All') }}>All Events</button>
        <button className={`py-2 px-4 rounded-3xl ${type === 'Hackathon' ? 'bg-gray-400' : 'bg-[#03045E]'} text-white font-semibold hover:bg-gray-400`} onClick={() => { handletype('Hackathon'); }}>Hackathon</button>
        <button className={`py-2 px-4 rounded-3xl ${type === 'Competitive Coding' ? 'bg-gray-400' : 'bg-[#0077B6]'} text-white font-semibold hover:bg-gray-400`} onClick={() => { handletype('Competitive Coding') }}>  Coding</button>
        <button className={`py-2 px-4 rounded-3xl ${type === 'Case Study' ? 'bg-gray-400' : 'bg-[#00B4D8]'} text-white font-semibold hover:bg-gray-400`} onClick={() => { handletype('Case Study') }}>Case Study</button>
        <button className={`py-2 px-4 rounded-3xl ${type === 'Cultural' ? 'bg-gray-400' : 'bg-[#4e3dce]'} text-white font-semibold hover:bg-gray-400`} onClick={() => { handletype('Cultural') }}>Cultural</button>
        <button className={`py-2 px-4 rounded-3xl ${type === 'Gaming' ? 'bg-gray-400' : 'bg-[#4361EE]'} text-white font-semibold hover:bg-gray-400`} onClick={() => { handletype('Gaming') }}>Gaming</button>
      </div>

      <div>
        <h1 className='text-lg font-semibold mt-8 mb-4'>Filter by Location:</h1>
        <input
          type="text"
          name=""
          value={cityInput}
          onChange={(e) => {
            const toTitleCase = (str) =>
              str
                .toLowerCase()
                .split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            setCityInput(toTitleCase(e.target.value));
          }}
          className="mb-4"
        />
        <button className='py-2 px-4 rounded-3xl bg-[#009086] text-white font-semibold w-1/2' onClick={() => { handlecity(cityInput) }}>APPLY</button>
      </div>

      <Searchevn handleSearch={handleSearch} />
    </div>
  )
}

export default Filterevn
