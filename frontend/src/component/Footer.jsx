import React from 'react'
import logo from "../assets/vcart.png"

function Footer() {
  return (
    <div className="w-full bg-[#dbfcfcec]">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:h-[30vh] py-6 md:px-12 px-4 gap-8">
        
        {/* Logo + About */}
        <div className="md:w-1/3 flex flex-col gap-3 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <img src={logo} alt="oneKART" className="w-8 h-8 md:w-10 md:h-10" />
            <p className="text-lg md:text-xl font-semibold text-black">oneKART</p>
          </div>
          <p className="hidden md:block text-sm text-[#1e2223] leading-relaxed">
            oneKART is your all-in-one online shopping destination, offering
            top-quality products, unbeatable deals, and fast delivery—all backed
            by trusted service designed to make your life easier every day.
          </p>
          <p className="flex md:hidden text-sm text-[#1e2223]">
            Fast, Easy, Reliable, oneKART Shopping
          </p>
        </div>

        {/* Company Links */}
        <div className="md:w-1/4 flex flex-col items-center text-center gap-3">
          <p className="text-lg md:text-xl font-sans text-[#1e2223]">COMPANY</p>
          <ul className="flex flex-col gap-2 text-sm text-[#1e2223]">
            <li className="cursor-pointer hover:underline">Home</li>
            <li className="cursor-pointer hover:underline">About us</li>
            <li className="cursor-pointer hover:underline">Delivery</li>
            <li className="cursor-pointer hover:underline">Privacy policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="md:w-1/4 flex flex-col items-center text-center gap-3">
          <p className="text-lg md:text-xl font-sans text-[#1e2223]">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-sm text-[#1e2223]">
            <li>+91-9556779044</li>
            <li>Contact@gmail.com</li>
            <li>+91-7539012011</li>
            <li>OneKART@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-slate-400"></div>

      {/* Bottom Copyright */}
      <div className="w-full py-3 flex items-center justify-center text-sm text-center">
        © 2025 oneKART.com — All Rights Reserved
      </div>
    </div>
  )
}

export default Footer
