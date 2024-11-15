import React, { useEffect, useState } from 'react';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import SemiCircleGauge from './SemiCircleGauge';
import { MdEdit } from "react-icons/md";
import dayjs from 'dayjs';
import { Chip, TextField, Button } from '@mui/material';
import axios from 'axios';
import Profileimage from './Profileimage';
import { fetchuserprofileApi, host } from '../apiroutes';


function Profile() {
    const [userData, setUserData] = useState([]);
    const [isEditing, setIsEditing] = useState({});
    const [loading, setLoading] = useState(true);
    const [allevents, setallevents] = useState([]);
    const [newSkill, setNewSkill] = useState("");  // For adding a new skill

    const fetchUserProfile = async () => {
        try {
            const response = await fetch(fetchuserprofileApi, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const result = await response.json();
            if (result.success) {
                result.user.dateOfBirth = dayjs(result.user.dateOfBirth).format('DD/MM/YYYY');
                setUserData(result.user);
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

    const toggleEdit = (field) => {
        setIsEditing((prevState) => ({ ...prevState, [field]: !prevState[field] }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const saveChanges = async (field) => {
        try {
            const response = await fetch(fetchuserprofileApi, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ [field]: userData[field] })
            });
            const result = await response.json();
            if (result.success) {
                setUserData(result.user);
                handleSuccess('Profile updated successfully');
            } else {
                handleError(result.message);
            }
        } catch (error) {
            handleError('Failed to update profile');
        }
        toggleEdit(field);
    };

    const addSkill = async () => {
        if (newSkill.trim()) {
            const updatedSkills = [...userData.skills, newSkill];
            try {
                const response = await fetch(fetchuserprofileApi, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ skills: updatedSkills })
                });
                const result = await response.json();
                if (result.success) {
                    setUserData(result.user);
                    setNewSkill("");
                    handleSuccess('Skill added successfully');
                } else {
                    handleError(result.message);
                }
            } catch (error) {
                handleError('Failed to add skill');
            }
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

    const handleFile = async (file) => {
        const base64 = await convertBase64(file)
        try {
            const response = await fetch(fetchuserprofileApi, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ image: base64 })
            });
            const result = await response.json();
            if (result.success) {
                setUserData(result.user);
                handleSuccess('Skill added successfully');
            } else {
                handleError(result.message);
            }
        } catch (error) {
            handleError('Failed to add skill');
        }

    };

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
                                {isEditing[field] ? (
                                    <>
                                        <input
                                            type="text"
                                            name={field}
                                            value={userData[field] || ''}
                                            onChange={handleChange}
                                            className="text-white mt-1 p-2 block w-[70%] border border-gray-300 rounded-md ring-2 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-[#009086] bg-black"
                                        />
                                        <button
                                            onClick={() => saveChanges(field)}
                                            className="mt-1 bg-blue-600 text-white rounded-md px-4 py-1"
                                        >
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <div className='flex gap-3'>
                                        <p className="text-white mt-1 p-2 block w-[70%] border border-gray-300 rounded-md focus:outline-none truncate">
                                            {userData[field]}
                                        </p>
                                        <button onClick={() => toggleEdit(field)}>
                                            <MdEdit />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="w-full p-6 bg-black shadow-sm mt-4">
                        <h2 className="text-2xl text-white font-semibold mb-4">Description</h2>
                        {isEditing.description ? (
                            <div className="flex gap-2 flex-col">
                                <textarea
                                    name="description"
                                    value={userData.description}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={2}
                                    className='text-white bg-black p-2'
                                />
                                <button className='w-[10%] rounded-3xl bg-[#00786d] text-white' onClick={() => saveChanges('description')}>Save</button>
                            </div>
                        ) : (
                            <div className="flex gap-3 items-center">
                                <p className="text-white border-white rounded-lg">{userData.description}</p>
                                <button onClick={() => toggleEdit('description')}>
                                    <MdEdit />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Section - Profile Card */}
                <div className="w-full md:w-1/3 p-6 flex flex-col items-center bg-teal rounded-lg shadow-sm">
                    <Profileimage handleFile={handleFile} preview = {userData.image} />
                    <h2 className="text-xl text-white font-semibold">{userData.fullName}</h2>
                    <p className="text-white">Senior Software Engineer</p>
                    <p className="text-white">New York, USA</p>
                    <SemiCircleGauge percentage={76} rating={userData.rating} rating_count={userData.rating_count} />

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
                        <div className="flex gap-2 mt-2">
                            <input
                                className='text-white mt-1 p-2 border border-gray-300 rounded-md ring-2 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-[#009086] bg-black'
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                placeholder="Add new skill"

                            />

                            <button onClick={addSkill} className='bg-[#00786d] rounded-3xl'>Add</button>
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

export default Profile;


function convertBase64(file) {
    return new Promise((resolve, reject) => {
        const filereader = new FileReader()
        filereader.readAsDataURL(file)
        filereader.onload = () => {
            resolve(filereader.result)
        }
        filereader.onerror = (error) => {
            reject(error)
        }
    })
}