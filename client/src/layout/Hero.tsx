import dashboard from '../assets/dashboard.png'
// import TextType from "../components/TextType";
// import TextType from '../components/TextType';
// import laptop from '../assets/laptop.png'

import { Link } from "react-router-dom";
const Hero = () => {
  return (
  <div className="h-screen w-full bg-[url('/squares.png')] bg-no-repeat bg-top bg-[length:1200px_1000px]">
     {/* <img 
    src={laptop} 
    alt="laptop" 
   /> */}
    <div className='flex flex-col items-center h-screen pt-20'>
      <Link to="/" className='font-instrument text-6xl cursor-pointer  font-bold'> Snip-Shell </Link>
  <div >
    

  </div>
<div className="font-satoshi font-black italic cursor-pointer text-gray-700 
                text-3xl sm:text-4xl md:text-5xl mt-6 sm:mt-8 md:mt-10">
  your <span className="font-instrument font-bold underline text-black">thoughts</span> go to grow
</div>

<div>
  <img
    src={dashboard}
    alt="dashboard"
    className="w-[900px] mt-20 rounded-lg hover:scale-101 transition-all duration-200"
    style={{
      boxShadow: '0 -10px 15px -3px rgba(0,0,0,0.3), -10px 0 15px -3px rgba(0,0,0,0.3), 10px 0 15px -3px rgba(0,0,0,0.3)'
    }}
  />
</div >
<div className='mt-20 font-instrument text-4xl'>
    Expand Your Mind, Effortlessly.
  </div>
  <div className="flex justify-center mt-7">
        <button className="font-instrument text-lg bg-black text-white px-10 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300">
          start growing
        </button>
      </div>
  
  </div>
  

</div>

  )
}

export default Hero