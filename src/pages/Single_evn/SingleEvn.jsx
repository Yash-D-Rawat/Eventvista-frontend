import React, { useEffect, useState } from 'react';
import './Events.css';
import FeedbackRating from './FeedbackRating';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import FloatingBackground from '../Floating';
import { eventbyidApi } from '../../apiroutes';

const SingleEvn = () => {
  const { id } = useParams();
  const [event, setevent] = useState(null);
  console.log(id)
  useEffect(() => {
    axios.get(`${eventbyidApi}/${id}`).then((res) => {
      console.log(res)
      setevent(res.data.events)
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  const navigate = useNavigate();
  const handleNavigate = () => {
    console.log('singleevn'+event.organized_by)
    navigate(`/view_profile/${event.organized_by}`);
  };

  if (!event) {
    return <div>Loading...</div>;  // Show loading message while fetching data
  }

  return (
    <div>
      <div className='top w-full p-5 flex justify-around relative'>
        <FloatingBackground />
        <div className='left z-[1]'>
          <img src={event.image} alt="Hack Celestia Logo" className="w-[100%] rounded-xl" />
          {/* <h1>{event.title}</h1>
          <p className="event-details">
            <span className="detail-icon">&#x1F3E2;</span> {event.venue}
          </p>
          <p className="event-details">
            <span className="detail-icon">&#x1F4CD;</span> {event.location}
          </p>
          <p className="event-details">
            <span className="detail-icon">&#x1F4C5;</span> Updated On: {dayjs(event.creation).format("YYYY-MM-DD")}
          </p> */}
        </div>

        <div className='w-[60%] text-white rounded-xl p-8 flex justify-around gap-14 z-[1]'>
          <div className='flex flex-col justify-between'>
            <h3 className='text-3xl font-bold'>{event.title}</h3>
            <p className='text-xl font-semibold'>Deadline : {dayjs(event.eventdate).format("YYYY-MM-DD")} </p>
            <p className='text-xl font-semibold'>Online Venue : {event.venue}, {event.location} </p>
            <p className='text-xl font-semibold'>Event-Date : {dayjs(event.eventdate).format("YYYY-MM-DD")} at {dayjs(event.eventdate).format("HH:mm:ss")}</p>
            <div className="card">
              <div className="card-item">
                <div className="icon globe-icon"></div>
                <p>Online</p>
              </div>
              <div className="card-item">
                <div className="icon building-icon"></div>
                <p>Public</p>
              </div>
              <div className="card-item">
                <p className="value">${event.prize}</p>
                <p className="subtitle">in prizes</p>
              </div>
              <div className="card-item">
                <p className="value">{event.registration}</p>
                <p className="subtitle">participants</p>
              </div>
            </div>

          </div>

          <div className='flex flex-col text-xl font-semibold gap-4 justify-between'>
            <p>Type : {event.type}</p>
            <p>Reg-Fee : {event.fee}/team</p>

            <p>Creation: {dayjs(event.creation).format("YYYY-MM-DD")}</p>
            <button onClick={handleNavigate} className='bg-transparent shadow-none p-0'><p>Organized By : {event.organized_by}</p></button>
            <p>Contact : 987564324</p>
          </div>
        </div>
      </div>

      <div className='description'>

        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3 className="timeline-date">January 2024</h3>
              <h4 className="timeline-title">Event Kickoff</h4>
              <p>Launch of the event with opening remarks and introductions."Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3 className="timeline-date">Feb 2024</h3>
              <h4 className="timeline-title">Phase 1 Completion</h4>
              <p>Phase 1 tasks completed, including preliminary reviews and project setup. "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
            </div>

          </div>
        </div>
        <div className='desc' dangerouslySetInnerHTML={{ __html: event.description }}>

        </div>

      </div>
      <div className='contact'>
        <h2>Contact The Organizer</h2>
        <p>934241230013</p>
      </div>
      <FeedbackRating organized_by={event.organized_by} />

    </div>
  );
};

export default SingleEvn;
