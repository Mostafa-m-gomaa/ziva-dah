import React from 'react'
import VideoBackground from './VideoBackground '
import { WavyBackground } from '../wavy-background'

const Landing = () => {
  return (
    <div className='w-full h-[100vh] relative  bg-black'>
      <VideoBackground  />
      {/* <WavyBackground /> */}
      
      <div className="flex flex-col text-white w-[90%] gap-y-3 top-[40%] left-[50%] translate-x-[-50%] absolute bottom-0 z-10 sm:w-[50%] sm:text-center">
        <div className='text-[30px] sm:text-[45px]' data-aos="fade-down">Spring / Summer / 2024</div>
        <p data-aos="fade-down">Since 1895, founder Daniel Swarovski’s passion for innovation and design, and mastery of crystal cutting has defined Swarovski as the leading jewelry and accessories brand.</p>
        <div className="flex w-full justify-center gap-x-1" data-aos="fade-down">
            <button className='transition-all w-[40%] border-2 py-2 capitalize bg-white text-black hover:bg-inherit hover:text-white '>discover</button>
            <button className='transition-all w-[40%] border-2 py-2 capitalize  hover:bg-white hover:text-black  '>read more</button>
        </div>
      </div>
    
     
    </div>
  )
}

export default Landing