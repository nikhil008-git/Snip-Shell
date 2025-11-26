import React, { useState } from 'react';
import { VscGithub } from "react-icons/vsc";
import { DiYii } from "react-icons/di";
import { Link } from 'react-router-dom';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='fixed w-full backdrop-blur bg-white/5'>
        
      <div className='hidden bg-white-100 h-10 backdrop-blur bg-white/10 pt-1 md:flex md:flex-row justify-center gap-90 items-center cursor-pointer shadow-sm '>
        
        <div><DiYii /></div>


        <div className='font-instrument cursor-pointer text-md'>
          <Link to="/logg" className='font-instrument hover:text-gray-700 '> Changelog</Link>
        </div>

        <div className='md:flex flex-row gap-4 items-center'>
          <VscGithub />
          <div className='hover:bg-gray-100 font-inter border-[0.5px] border-gray-200 h-7 w-16 rounded-sm text-sm md:flex items-center justify-center cursor-pointer'>
            signup
          </div>
        </div>
      </div>


      <div className='md:hidden flex flex-row justify-between p-2 bg-white-100 backdrop-blur bg-white/10'>
        
        <div><DiYii /></div>

        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'X' : '☰'}
        </button>

        {isOpen && (
          <div className='absolute top-12 right-2 bg-white border border-black p-2 flex flex-col gap-3 shadow-md'>


            <div className='font-instrument cursor-pointer'>
              Changelog
            </div>

            <div className='flex flex-row gap-2 items-center'>
              <VscGithub />
              <div className='font-instrument border border-black h-5 w-16 rounded-sm text-sm flex items-center justify-center'>
                signup
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Header;
