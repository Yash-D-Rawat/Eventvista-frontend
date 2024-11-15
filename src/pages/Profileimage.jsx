import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";

function Profileimage({ handleFile, preview }) {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Create a URL for the selected file to show as a preview // Update preview state with the image URL
            alert("File uploaded successfully!");
            handleFile(file);
        }
    };

    return (
        <div className="flex items-center flex-col w-full">
            <div className='w-full flex justify-center relative'>
                {preview ? (
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-[30%] object-cover mb-4 border-2 border-[#009086] rounded-full"
                    />
                ) : (
                    <img
                        src="/images/default.jpeg"
                        alt="Alternate"
                        className="w-[30%] object-cover mb-4 border-2 border-[#009086] rounded-full"
                    />
                )}

                <label
                    htmlFor="fileInput"
                    className="absolute bottom-2 right-36 bg-[#009086] text-white text-center font-semibold p-3 rounded-full cursor-pointer border-2 border-[#009086] hover:bg-[#00786d] transition"
                >
                    <MdEdit />
                </label>
            </div>
            <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleFileChange}
                name='image'
                required />


        </div>
    )
}

export default Profileimage

