import Link from 'next/link'
import React from 'react'
import MobileMenu from './MobileMenu'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between h-24'>
        {/* LEFT */}
        <div className='font-bold text-xl text-blue-600'>
            <Link href="/">VICTORSOCIAL</Link>
        </div>
        {/* CENTER */}
        <div className='hidden'></div>
        {/* RIGHT */}
        <div className=''>
          <MobileMenu />
        </div>
    </div>
  )
}

export default Navbar