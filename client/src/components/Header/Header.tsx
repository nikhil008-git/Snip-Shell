import React, { useState } from 'react';
import { VscGithub } from "react-icons/vsc";
import { DiYii } from "react-icons/di";
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../modal/Modal';
import { useAuth } from '../../hooks/AuthContext';

function Header() {
  const navigate = useNavigate();
  const { Signin, Signup }  = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  // Signin modal
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Signup modal
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [signupData, setSignupData] = useState({ username: "", email: "", password: "" });

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await Signin(formData);
    setShowModal(false);
    navigate("/dashboard");
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await Signup(signupData);
    setShowSignupModal(false);
    setShowModal(true); //after closing signup it will open signin modal
  };

  return (
    <div className='fixed w-full backdrop-blur bg-white/5'>

      {/* Desktop Header */}
      <div className='hidden bg-white-100 h-10 backdrop-blur bg-white/10 pt-1 md:flex md:flex-row justify-center gap-90 items-center cursor-pointer shadow-sm '>
        
        <div><DiYii /></div>

        <div className='font-instrument cursor-pointer text-md'>
          <Link to="/logg" className='font-instrument hover:text-gray-700 '> Changelog</Link>
        </div>

        <div className='md:flex flex-row gap-4 items-center'>
          <VscGithub />

          {/* Signin */}
          <div className='hover:bg-gray-100 font-inter border-[0.5px] border-gray-200 h-7 w-16 rounded-sm text-sm md:flex items-center justify-center cursor-pointer'>
            <button onClick={() => setShowModal(true)}>signin</button>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
              <form onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                  <input className="border border-white mt-10 mb-10" type="text" name="email" value={formData.email} onChange={handleChange} />
                  <input className="border border-white" type="password" name="password" value={formData.password} onChange={handleChange} />
                  <button type="submit">Submit</button>
                </div>
              </form>
            </Modal>
          </div>

          {/* Signup */}
          <div className='hover:bg-gray-100 font-inter border-[0.5px] border-gray-200 h-7 w-16 rounded-sm text-sm md:flex items-center justify-center cursor-pointer'>
            <button onClick={() => setShowSignupModal(true)}>signup</button>
            <Modal show={showSignupModal} onClose={() => setShowSignupModal(false)}>
              <form onSubmit={handleSignupSubmit}>
                <div className='flex flex-col'>
                  <input className="border border-white mt-10 mb-2" type="text" name="username" value={signupData.username} onChange={handleSignupChange} placeholder="Username" />
                  <input className="border border-white mb-2" type="text" name="email" value={signupData.email} onChange={handleSignupChange} placeholder="Email" />
                  <input className="border border-white mb-2" type="password" name="password" value={signupData.password} onChange={handleSignupChange} placeholder="Password" />
                  <button type="submit">Submit</button>
                </div>
              </form>
            </Modal>
          </div>

        </div>
      </div>

      {/* Mobile Header */}
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
            <button onClick={() => setShowModal(true)}>Signin</button>
            <button onClick={() => setShowSignupModal(true)}>Signup</button>
          </div>
        )}

      </div>

    </div>
  );
}

export default Header;
