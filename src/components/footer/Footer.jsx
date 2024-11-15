import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-teal-900 text-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">EventVista</h2>
            <p className="text-sm text-gray-400">
            At EventVista, we believe that participation is the cornerstone of success. Remember, every victory begins with the decision to get involved.
            </p>
          </div>

          {/* Links */}
        <div>
        <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
        <ul className="space-y-2">
            <li><a href="/about" className="text-white hover:text-gray-300">About Us</a></li>
            <li><a href="/services" className="text-white hover:text-gray-300">Services</a></li>
            <li><a href="/blog" className="text-white hover:text-gray-300">Blog</a></li>
            <li><a href="/contact" className="text-white hover:text-gray-300">Contact</a></li>
        </ul>
        </div>


          {/* Social Media Links */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Follow Us</h2>
            <div className="flex space-x-4">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedin />

            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-4">
          <p className="text-center text-gray-500 text-sm">
            ©2024 EventVista. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;