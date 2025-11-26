import React from 'react';
import FlynnRider from "../assets/FlynnRider.jpg";
import { Link } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";

function Logg() {
  return (
    <>
  <div className="h-screen w-full bg-[url('/squares.png')] bg-no-repeat bg-top bg-[length:1000px_600px]">
  <div className='pt-10 ml-60 text-3xl'>
    <div className='flex flex-row gap-1 items-center cursor-pointer'>
<div><FaLongArrowAltLeft />
</div>

     <Link to="/" className='font-instrument '> Home</Link> 
    </div>

  </div>
     

      <div className='flex ml-50 mt-10'>
        <img 
          src={FlynnRider} 
          alt="flynnRider" 
          className="w-80 h-80 rounded-lg shadow-[0_-4px_15px_rgba(0,0,0,0.1),_4px_0_15px_rgba(0,0,0,0.1),_-4px_0_15px_rgba(0,0,0,0.2)]" 
        />
      </div>
      </div>
    </>
  );
}

export default Logg;
