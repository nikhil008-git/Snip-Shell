import React from 'react'
// import squares from '../../assets/squares.png'
import { DiYii } from "react-icons/di";
import { useAuth } from '../../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
    const navigate = useNavigate();
    const { Logout } = useAuth();
     const handleLogout = () => {
    Logout();            
    navigate("/");  
  };
  return (
    <>

    <div className='h-screen w-[300px] bg-white text-black rounded-r-sm border border-black shadow-lg '> 
    <div className='font-instrument text-2xl p-4 border-b border-black text=center pd-10 flex flex-row gap-10'>  <DiYii /> Snip-Shell 


    </div>
    <div>collections</div>
    <div>youtube</div>
    <div>X</div>
    <div>url</div>
<button onClick={handleLogout}>logout</button>
<div></div>
    
    
     </div>
     
     </>
  )
}

export default Sidebar