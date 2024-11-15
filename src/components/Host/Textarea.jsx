import React, { useState } from 'react'

function Textarea({description, handleChange}) {
    return (
        <div className='w-2/3'>
        <h1 className='text-[#009086]'>Event Description</h1>
            <textarea
                name="description"
                value={description}
                onChange={handleChange}
                id=""
                className='h-52 w-full border-[#009086] border-[3px] rounded-md p-5'
                placeholder='Description'
                
                required />
        </div>

    )
}

export default Textarea