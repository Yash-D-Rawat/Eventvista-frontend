import React from 'react'
import Carousel_hero from './Carousel_hero'
import { motion } from "framer-motion";
import FloatingBackground from '../../pages/Floating';
import { Link } from 'react-router-dom';
function Hero() {
    return (
        <div className='w-screen h-[600px] flex items-center justify-around p-8 relative bg-[teal]'>
            <FloatingBackground />
            {/* <video autoPlay loop className='absolute w-screen h-full' src="./images/disney.mp4"></video> */}
            <div className='w-1/3 z-[1]'>
                <motion.div
                    className="box flex flex-col gap-4"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 1.5,
                        delay: 0.5,
                        ease: [0, 0.71, 0.2, 1.01]
                    }}
                >
                    <p className='text-6xl font-extrabold text-white'>Click Compete Win Repeat</p>
                    <span>
                        <button className='px-5 py-3 font-medium text-lg bg-[#00D7CB] flex rounded-3xl text-white'>Explore More</button>
                    </span>
                </motion.div>

            </div>
            <div className='w-1/5 z-[1]'>
                <Carousel_hero />
            </div>
        </div>
    )
}

export default Hero