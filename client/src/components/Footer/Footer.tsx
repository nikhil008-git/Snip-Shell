import React from 'react';
import flynnrider from "../../assets/flynnrider.png";
import { IoLogoGithub } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";


const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-300 mt-10">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 py-3 max-w-6xl mx-auto">
        
        {/* Left side: Copyright */}
        <div className="text-gray-600 text-sm">
          © 2025 SnipShell. Nikhil Rajpurohit
        </div>

        {/* Right side: X link with placeholder for logo */}
        <div className="flex items-center space-x-2 mt-10 md:mt-0">
          {/* Placeholder for X logo */}
          <a 
            href="https://x.com/nick_realm_01" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-800 text-sm hover:underline"
          >
           <img src={flynnrider} alt="FlynnRider" className="w-5 h-5 rounded-sm" />
          </a>
           <a 
            href="https://x.com/nick_realm_01" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-800 text-sm hover:underline"
          >
<FaXTwitter  className='w-5 h-5 rounded-sm'/>
          </a>
           <a 
            href="https://github.com/nikhil008-git/Snip-Shell" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-800 text-sm hover:underline"
          >
           <IoLogoGithub className="w-5 h-5 rounded-sm" />

          </a>
          
        </div>

      </div>
    </footer>
  );
};

export default Footer;
