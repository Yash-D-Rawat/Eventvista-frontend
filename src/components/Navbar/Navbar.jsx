import React, { useEffect, useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { FaPlus } from 'react-icons/fa6';
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [loggedInUser, setLoggedInUser] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Loggedout');
    setTimeout(() => {
      navigate('/Login');
    }, 1000)
  }

  return (
    <div className='flex w-screen justify-between px-10 items-center'>
      <img src="/images/logo.png" alt="" className='w-[10%]' />
      <ul className='flex justify-around w-[40%]  font-bold text-lg'>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.5,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01]
          }}
        ><li className='hover:text-[#00786d]'>
            <Link to="/">Home</Link>
          </li></motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.5,
            delay: 0.6,
            ease: [0, 0.71, 0.2, 1.01]
          }}
        ><li className='hover:text-[#00786d]'>
            <Link to={`/events/by_type/${'all'}/${'all'}`}>Events</Link>
          </li></motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.5,
            delay: 0.7,
            ease: [0, 0.71, 0.2, 1.01]
          }}
        ><li className='hover:text-[#00786d]'>
            <Link to="/EventMap">Event Map</Link>
          </li></motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.5,
            delay: 0.8,
            ease: [0, 0.71, 0.2, 1.01]
          }}
        ><li className='hover:text-[#00786d]'>
            <Link to="/About">About Us</Link>
          </li></motion.div>
      </ul>
      <Link to='/host'>
        <button className='bg-[#009086] text-white font-semibold text-lg rounded-3xl px-4 py-1 hover:bg-[#00786d] transition-all duration-150 ease-in flex items-center gap-4'>
          <FaPlus />
          Host
        </button>
      </Link>
      <div className='flex gap-10'>
        <Link to='/Profile'><CgProfile className='size-7' /></Link>
        <Link to='/Login'><IoLogOutOutline className='size-7' onClick={handleLogout} /></Link>
      </div>


      {/* <ToastContainer /> */}
    </div>
  )
}

export default Navbar