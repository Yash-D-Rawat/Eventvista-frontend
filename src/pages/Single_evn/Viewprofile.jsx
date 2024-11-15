import React, { useEffect, useState } from 'react';
import { handleError, handleSuccess } from '../../utils';
import { ToastContainer } from 'react-toastify';
import SemiCircleGauge from '../SemiCircleGauge';
import { MdEdit } from "react-icons/md";
import dayjs from 'dayjs';
import { Chip} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { host, viewprofileApi } from '../../apiroutes';

function Viewprofile() {
    const { username } = useParams();
    console.log(username)
    const [userData, setUserData] = useState([]);
    
    const [loading, setLoading] = useState(true);
    const [allevents, setallevents] = useState([]);

    const fetchUserProfile = async () => {
        try {
            const response = await fetch(`${viewprofileApi}/${username}`);
            const result = await response.json();
            console.log(result.user[0]);
            
            if (result.success) {
                result.user.dateOfBirth = dayjs(result.user.dateOfBirth).format('DD/MM/YYYY');
                setUserData(result.user[0]);
                handleSuccess('Profile data loaded successfully');
            } else {
                handleError(result.message);
            }
            setLoading(false);
        } catch (error) {
            handleError('Failed to load profile data');
        }
    };

    const fetchUserEvents = async () => {
        try {
            const res = await axios.get(`${host}/${userData.username}`);
            setallevents(res.data.events);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    useEffect(() => {
        if (userData.username) {
            fetchUserEvents();
        }
    }, [userData.username]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='w-full'>
            <div className="flex flex-col justify-center w-full md:flex-row mx-auto p-6 bg-black  shadow-lg">
                <div className="w-full md:w-2/3 p-6 bg-black rounded-lg shadow-sm">
                    <h2 className="text-2xl text-white font-semibold mb-4">General Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['fullName', 'username', 'email', 'phone', 'age', 'gender', 'dateOfBirth', 'collegeName'].map((field) => (
                            <div key={field}>
                                <label className="text-white block text-sm font-medium capitalize">
                                    {field === 'dateOfBirth' ? 'Date of Birth' : field}
                                </label>
                                {
                                    <div className='flex gap-3'>
                                        <p className="text-white mt-1 p-2 block w-[70%] border border-gray-300 rounded-md focus:outline-none truncate">
                                            {userData[field]}
                                        </p>
                                    </div>
                                }
                            </div>
                        ))}
                    </div>

                    <div className="w-full p-6 bg-black shadow-sm mt-4">
                        <h2 className="text-2xl text-white font-semibold mb-4">Description</h2>
                        {
                            <div className="flex gap-3 items-center">
                                <p className="text-white border-white rounded-lg">{userData.description}</p>
                            </div>
                        }
                    </div>
                </div>

                {/* Right Section - Profile Card */}
                <div className="w-full md:w-1/3 p-6 flex flex-col items-center bg-teal rounded-lg shadow-sm">
                    <img src={userData.image ? userData.image : "/images/default.jpeg"}  alt="Profile" className="w-44 h-44 rounded-full mb-4 border-green-600 border-[2px]" />
                    <h2 className="text-xl text-white font-semibold">{userData.fullName}</h2>
                    <p className="text-white">Senior Software Engineer</p>
                    <p className="text-white">New York, USA</p>
                    <SemiCircleGauge percentage={76} rating = {userData.rating} rating_count = {userData.rating_count} />

                    {/* Skills Section */}
                    <div className="mt-4">
                        <h3 className="text-lg text-white font-semibold">Skills</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {userData.skills && userData.skills.map((skill, index) => (
                                <Chip key={index} label={skill} 
                                sx={{
                                    backgroundColor: '#00786d',
                                    color: 'white', // Set text color to white for contrast
                                }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>

            {/* Description Section */}


            <div className="w-full p-6 bg-black  shadow-sm">
                <h2 className="text-2xl text-white font-semibold mb-4">Events Hosted</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {allevents.map((event) => (
                        <div className="p-4 bg-gray-800 rounded-lg shadow-md flex justify-around items-center">
                            <img src={event.image} alt={event.title} className="h-32 rounded-md object-cover mb-4" />
                            <div>
                                <h3 className="text-xl text-white font-semibold">{event.title}</h3>
                                <p className="text-gray-400">Date: {dayjs(event.eventdate).format('DD/MM/YYYY')}</p>
                                <p className="text-gray-400">Location: {event.location}</p>
                                <div className="flex items-center mt-2">
                                    {/* Add other elements if needed */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Viewprofile;
