import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
// import image from './assets/image.png'
const HostSection = () => {
  return (
    <motion.div
    initial={{ x: -100, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
      transition={{
        duration: 1.5,
        bounce: 0.7,
        // stiffness: 100,  // Controls the bounciness
        damping:4,
        type: "spring",
      }}
      viewport={{ amount: 0.5 }}
    >
      <section className="flex flex-col md:flex-row items-center bg-white px-14 py-12 md:py-16 lg:py-24">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-5xl font-bold text-gray-800">
            Host Your Own <span className="text-blue-600">Opportunity</span>
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            Engage with a diverse talent pool or hire the best minds from{" "}
            <span className="text-blue-600 font-semibold">18 Mn+</span> users.
          </p>
          <div className="flex space-x-4 mt-8">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition">
              <Link to='/host'>Host Now</Link>
            </button>
            <button className="px-6 py-3 bg-transparent text-gray-600 font-semibold rounded-lg border border-gray-300 hover:bg-gray-100 transition">
              Know More
            </button>
          </div>
        </div>
        <div className="flex justify-end items-center w-1/2">
          <img src='https://d8it4huxumps7.cloudfront.net/uploads/images/65799cfe6d841_frame_1000012421.png?d=600x600' className="w-[90%] h-auto object-cover" />
        </div>
      </section>
    </motion.div>
  );
};

export default HostSection;