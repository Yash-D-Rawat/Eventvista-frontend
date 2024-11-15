import React, { useEffect, useRef, useState } from 'react'
import TextField from '@mui/material/TextField';
import Dropdown from './Dropdown';
import Textarea from './Textarea';
import Imageinput from './Imageinput';
import Datepicker from './Datepicker';
import Reg_prize from './Reg_prize';
import dayjs from 'dayjs';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// import JoditEditor from 'jodit-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FloatingBackground from '../../pages/Floating';
import { fetchuserprofileApi, host } from '../../apiroutes';

const COLOR = '#009086'

function Host() {
    const [userData, setUserData] = useState(null);

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
        } catch (error) {
            handleError('Failed to load profile data');
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    useEffect(() => {
        if (userData) {
            setFormData((prevData) => ({
                ...prevData,
                organized_by: userData.username
            }));
        }
    }, [userData]);

    const editor = useRef(null);
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const [formData, setFormData] = useState({
        title: '',
        venue: '',
        location: '',
        type: '',
        fee: '',
        prize: '',
        registration: 0,
        eventdate: '',
        organized_by: '',
        image: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        console.log(name, value);
    };

    const handledesc = (data) => {
        setFormData({
            ...formData,
            description: data
        });
        console.log(data);
    };

    function handleDate(date, time) {
        if (date && time && date.isValid() && time.isValid()) {
            const combinedDateTime = dayjs(date).hour(time.hour()).minute(time.minute()).toISOString();
            setFormData({
                ...formData,
                eventdate: combinedDateTime
            });
            console.log(combinedDateTime);
        } else {
            console.log("Invalid date or time");
        }
    }

    const handleFile = async (file) => {
        const base64 = await convertBase64(file)
        setFormData({
            ...formData,
            image: base64
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${host}/host`, formData);
            console.log('Event created:', response.data);
            handleClick();
            setFormData({
                title: '',
                venue: '',
                location: '',
                type: '',
                fee: '',
                prize: '',
                registration: 0,
                eventdate: '',
                organized_by: userData.username,
                image: '',
                description: '',
            });
        } catch (error) {
            console.error('There was an error creating the event!', error);
        }
    };

    return (
        <div className='relative w-screen h-fit flex justify-center'>
            <div className="relative w-screen h-full flex justify-center p-14">
                <FloatingBackground /> {/* This component now covers the entire height of the form container */}

                <form onSubmit={handleSubmit} className=' z-[2] w-[60%] flex flex-col gap-8 items-center bg-white p-5 rounded-lg'>
                    <h1 className='text-[#009086] text-2xl font-bold'>Event Details</h1>

                    <Imageinput handleFile={handleFile} />
                    <Dropdown type={formData.type} handlechange={handleChange} />

                    <TextField
                        name='title' value={formData.title} onChange={handleChange} label="Event title"
                        multiline maxRows={4} required className='w-2/3' sx={{
                            '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: COLOR },
                            '& .MuiInputLabel-root.Mui-focused': { color: COLOR },
                        }}
                    />

                    <TextField
                        name='venue' value={formData.venue} onChange={handleChange} label="Venue"
                        multiline maxRows={4} required className='w-2/3' sx={{
                            '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: COLOR },
                            '& .MuiInputLabel-root.Mui-focused': { color: COLOR },
                        }}
                    />

                    <TextField
                        name='location' value={formData.location} onChange={handleChange} label="Location"
                        multiline maxRows={4} required className='w-2/3' sx={{
                            '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: COLOR },
                            '& .MuiInputLabel-root.Mui-focused': { color: COLOR },
                        }}
                    />

                    <Datepicker handleDate={handleDate} />
                    <ReactQuill value={formData.description} onChange={(data) => handleChange({ target: { name: 'description', value: data } })} placeholder="Add event description here..." className='mb-10 h-56 w-2/3' />

                    <Reg_prize reg={formData.fee} prize={formData.prize} handleChange={handleChange} />

                    <input type="submit" className='bg-[#009086] w-1/5 text-white text-center font-semibold px-4 py-2 rounded-full cursor-pointer border-2 border-[#009086] hover:bg-[#00786d] transition' />
                </form>
            </div>

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                    Form Submitted Successfully!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Host

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
