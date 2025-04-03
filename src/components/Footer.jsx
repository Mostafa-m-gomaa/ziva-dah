import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";


const Footer = () => {
  return (
    <div className="w-full text-white bg-black border-t-2 border-white">
        <div className="w-[80%] mx-auto py-5 flex justify-between">
        <div className="w-[60%] flex flex-col gap-y-3">
<div className="text-[20px]">Follow Us</div>
<div className="flex justify-start gap-2">
<a href=""><FaFacebookF /></a>
<a href=""><FaInstagram /></a>
<a href=""><FaTiktok /></a>
<a href=""><FaWhatsapp /></a>

</div>
        </div>
        <div className="w-[35%] flex flex-col gap-y-3">
 <Link to="/contact">Contact Us</Link>
 <Link to="/about">About Us</Link>
 <Link to="/">Legal Privacy</Link>
        </div>
        </div>
      

    </div>
  )
}

export default Footer