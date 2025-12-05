import dashboard from '../assets/dashboard.png'
import TextType from "../components/TextType";
// import TextType from '../components/TextType';
const Hero = () => {
  return (
  <div className="h-screen w-full bg-[url('/squares.png')] bg-no-repeat bg-top bg-[length:1200px_1100px]">
    <div className='flex flex-col items-center h-screen pt-20'>
  <div className='font-instrument text-4xl  '>Snip-Shell</div>
<TextType  className='mt-5  text-3xl font-satoshi text-gray/80 font-thin'
 text={[
  "Build your Second Brain",
  "Organize. Create. Grow.",
  "Turn ideas into action."
]}

  typingSpeed={90}
  pauseDuration={1500}
  showCursor={true}
  cursorCharacter="|"
/>
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
  <div className='font-inter mt-5 bg-gray-100 w-45 text-center rounded-lg'> get into the dashboard</div>
  
  </div>
  

</div>

  )
}

export default Hero