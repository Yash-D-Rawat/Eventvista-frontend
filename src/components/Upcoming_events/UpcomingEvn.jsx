import React, { useEffect, useState } from 'react'
import Eventitem from './Eventitem'
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';
import axios from 'axios';
import { host } from '../../apiroutes';

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 3000, min: 1430 },
        items: 4, // Display 4 items at a time
    },
    desktop: {
        breakpoint: { max: 1431, min: 1070 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1070, min: 700 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 700, min: 600 },
        items: 1.5,
    },
    smallermobile: {
        breakpoint: { max: 600, min: 0 },
        items: 1
    }
};

const CustomLeftArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        style={{
            position: 'absolute',
            left: '0px', // Control spacing from the carousel items
            top: '55%',
            transform: 'translateY(-50%)',
            zIndex: 1,
            background: 'black',
            border: 'none',
            cursor: 'pointer',
            opacity: 0.5
        }}
    >
        <FaCircleChevronLeft className='size-8' />
    </button>
);

const CustomRightArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        style={{
            position: 'absolute',
            right: '0px', // Control spacing from the carousel items
            top: '55%',
            transform: 'translateY(-50%)',
            zIndex: 1,
            background: 'black',
            border: 'none',
            cursor: 'pointer',
            opacity: 0.5
        }}
    >
        <FaCircleChevronRight className='size-8' />
    </button>
);


function UpcomingEvn() {
    const [featuredevents, setfeaturedevents] = useState([]);
    useEffect(() => {
        axios.get(`${host}/`).then((res) => {
            setfeaturedevents(res.data.events);
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    return (
        <div className='p-5 my-5'>
            <span className='text-3xl mb-2 font-bold bg-[#009086] px-2 py-1 text-white rounded-t-lg'>Upcoming events</span>
            <Carousel
                swipeable={true}
                responsive={responsive}
                autoPlay={true}
                infinite={true}
                containerClass='carousel-container'
                itemClass='carousel-item-padding-40-px'
                className='p-6 w-full bg-[#009086] rounded-b-md rounded-r-md'
                removeArrowOnDeviceType={["tablet", "mobile", "smallermobile"]}
                customLeftArrow={<CustomLeftArrow />}
                customRightArrow={<CustomRightArrow />}

            >
                {featuredevents.map((item, index) => (
                    <Eventitem key={item._id} image = {item.image} category = {item.type} title = {item.title} registration = {item.registration} />
                ))}
            </Carousel>
        </div>
    )
}

export default UpcomingEvn