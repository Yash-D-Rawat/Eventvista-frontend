import React, { useState } from 'react'

function Imageinput({ handleFile }) {

    const [preview, setPreview] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Create a URL for the selected file to show as a preview
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl); // Update preview state with the image URL
            alert("File uploaded successfully!");
            handleFile(file);
        }
    };

    return (
        <div className="flex items-center flex-col w-full">
            {preview ? (
                <img
                    src={preview}
                    alt="Preview"
                    className="w-[30%] object-cover mb-4 border-2 border-[#009086]"
                />
            ) : (
                <img
                    src="/images/default.jpeg"
                    alt="Alternate"
                    className="w-[30%] object-cover mb-4 border-2 border-[#009086]"
                />
            )}
            <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleFileChange}
                name='image'

                required />

            <label
                htmlFor="fileInput"
                className="bg-[#009086] w-1/5 text-white text-center font-semibold px-4 py-2 rounded-full cursor-pointer border-2 border-[#009086] hover:bg-[#00786d] transition"
            >
                Choose File
            </label>
        </div>
    )
}

export default Imageinput

