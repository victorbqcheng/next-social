"use client"
import Link from 'next/link';
import React, { useState } from 'react'

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className=''>
      <div className='flex flex-col gap-[4.5px] cursor-pointer' onClick={()=>setIsOpen(pre=>!pre)}>
        <div className={`bg-blue-500 w-6 h-1 rounded-sm ${isOpen?"rotate-45":""} origin-left duration-500`}></div>
        <div className={`bg-blue-500 w-6 h-1 rounded-sm ${isOpen?"opacity-0":""} duration-500`}></div>
        <div className={`bg-blue-500 w-6 h-1 rounded-sm ${isOpen?"-rotate-45":""} origin-left duration-500`}></div>
      </div>
      {
        isOpen && (
          <div className='absolute left-0 top-24 w-full h-[calc(100vh-96px)] bg-white flex flex-col items-center justify-center gap-8 font-medium text-lg z-10 select-none'>
            <Link href="/">Home</Link>
            <Link href="/">Friends</Link>
            <Link href="/">Groups</Link>
            <Link href="/">Stories</Link>
            <Link href="/">Login</Link>
          </div>
        )
      }
    </div>
  )
}

export default MobileMenu