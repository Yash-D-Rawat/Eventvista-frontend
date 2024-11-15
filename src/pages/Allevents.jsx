import React, { useEffect, useState } from 'react'
import Newevents from '../components/eventscroll/Newevents'
import Filterevn from '../components/eventscroll/Filterevn'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { getUserLocation, getCityFromCoordinates, getCoordinatesFromCity } from './locationService';
import { eventsbytypeApi } from '../apiroutes';

function Allevents({ type, handletype, city, handlecity }) {
    const [allevents, setallevents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
      axios.get(`${eventsbytypeApi}/${type}/${city}`)
        .then((res) => {
          // Filter events based on search term if it's not empty
          const filteredEvents = searchTerm 
            ? res.data.events.filter(event => event.title.toLowerCase().includes(searchTerm.toLowerCase()))
            : res.data.events;
          
          setallevents(filteredEvents);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [type, city, searchTerm]);
  
    const handleSearch = (term) => {
      setSearchTerm(term);
    };
  
    return (
      <div className="w-full flex justify-center gap-2 bg-[#F6F6F6] p-4">
        <div className="p-6 w-[35%]">
          <Filterevn type={type} handletype={handletype} city={city} handlecity={handlecity} handleSearch={handleSearch} />
        </div>
        <div className="w-[55%] h-screen flex flex-col gap-5 overflow-y-auto scroll-smooth no-scrollbar p-6">
          {allevents.map((item, index) => (
            <Link key={index} to={`/events/by_id/${item._id}`}><Newevents item={item} /></Link>
          ))}
        </div>
      </div>
    );
  }
  

export default Allevents