import React, { useState, useEffect } from 'react';
import { GoTrophy } from "react-icons/go";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import dayjs from 'dayjs';

function Newevents({ item }) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const targetDate = dayjs(item.eventdate);

        const updateCountdown = () => {
            const now = dayjs();
            const diff = targetDate.diff(now);

            if (diff > 0) {
                setTimeLeft({
                    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((diff / (1000 * 60)) % 60),
                    seconds: Math.floor((diff / 1000) % 60),
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        const intervalId = setInterval(updateCountdown, 1000); // Update every second
        updateCountdown(); // Initial call to set immediately

        return () => clearInterval(intervalId);
    }, [item.eventdate]);

    return (
        <div className='w-full p-5 bg-white rounded-xl flex flex-col gap-5 shadow-xl cursor-pointer hover:scale-105 transition-all duration-150 ease-in'>
            <div className='flex items-center gap-5'>
                <img src={item.image} alt="" className='w-60 h-40 rounded-lg' />
                <div className='flex flex-col gap-2'>
                    <h1 className='text-3xl font-bold'>{item.title}</h1>
                    <p className='font-semibold'>{item.location}</p>
                </div>
            </div>

            <div className='flex justify-around'>
                <ul className='flex flex-col gap-2'>
                    <li className='flex items-center gap-2 font-semibold'><GoTrophy className='size-5' /> {item.organized_by}</li>
                    <li className='flex items-center gap-2 font-semibold'><IoLocationOutline className='size-5' />{item.venue}, {item.location}</li>
                    <li className='flex items-center gap-2 font-semibold'><CiCalendar className='size-5' />Event On: {item.eventdate}</li>
                    <li className='flex items-center gap-2 mt-1 border-gray-600 border-[1px] w-fit rounded-3xl px-4 py-2'>{item.type}</li>
                    <span className='flex bg-[#FFEBA0] w-fit p-3 font-semibold rounded-md'>
                        <img src="/images/trophy.png" alt="" className='w-7 h-7' />
                        <p>Cash Prizes Worth <strong>${item.prize}</strong></p>
                    </span>
                </ul>

                <div className='ml-5 flex flex-col gap-3 items-center'>
                    <p className='font-bold text-2xl'>Time Left</p>
                    <div className='flex space-x-2'>
                        <div className='bg-blue-100 text-blue-900 rounded-lg p-2 w-16 text-center'>
                            <p className='text-2xl font-bold'>{timeLeft.days}</p>
                            <p className='text-sm'>Days</p>
                        </div>
                        <div className='bg-green-100 text-green-900 rounded-lg p-2 w-16 text-center'>
                            <p className='text-2xl font-bold'>{timeLeft.hours}</p>
                            <p className='text-sm'>Hours</p>
                        </div>
                        <div className='bg-yellow-100 text-yellow-900 rounded-lg p-2 w-16 text-center'>
                            <p className='text-2xl font-bold'>{timeLeft.minutes}</p>
                            <p className='text-sm'>Minutes</p>
                        </div>
                        <div className='bg-red-100 text-red-900 rounded-lg p-2 w-16 text-center'>
                            <p className='text-2xl font-bold'>{timeLeft.seconds}</p>
                            <p className='text-sm'>Seconds</p>
                        </div>
                    </div>

                    <button className='mt-3 bg-[#009086] text-white font-semibold text-xl rounded-xl px-4 py-3 hover:bg-[#00786d] transition-all duration-150 ease-in flex items-center gap-4'>Register Now</button>
                </div>
            </div>
        </div>
    );
}

export default Newevents;
