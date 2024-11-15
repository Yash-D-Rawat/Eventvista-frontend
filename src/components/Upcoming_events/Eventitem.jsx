import React from 'react'
import { IoIosTimer } from 'react-icons/io'
import { MdOutlineGroup } from 'react-icons/md'

function Eventitem({image, category, title, registration}) {
    return (
        <div className='rounded-xl shadow-2xl max-w-80 hover:scale-105 transition-all duration-150 ease-in bg-white'>
            <img src={image} alt="" className='rounded-t-xl w-full min-h-[213px]' />
            <div className='p-4 flex flex-col gap-3'>
                <span className='bg-[#C6F7D5] px-2 w-fit rounded-xl'>{category}</span>
                <p className='font-bold text-lg truncate'>{title}</p>
                <p className='flex text-base items-center gap-1'><MdOutlineGroup />{registration} Registered</p>
                <p className='flex items-center gap-1 text-base'><IoIosTimer />17 days left</p>
            </div>
        </div>
    )
}

export default Eventitem