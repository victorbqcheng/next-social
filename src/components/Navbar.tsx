import Link from 'next/link'
import React from 'react'
import MobileMenu from './MobileMenu'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between h-24'>
      {/* LEFT */}
      <div className='md:hidden lg:block w-[20%]'>
        <Link className='font-bold text-xl text-blue-600' href="/">
          VICTORSOCIAL
        </Link>
      </div>
      {/* CENTER */}
      <div className='hidden md:flex w-[50%] text-sm'>
        {/* Links */}
        <div className='flex gap-6 text-gray-600'>
          <Link href="/" className='flex gap-1 items-center'>
            <Image src="/home.png" alt='Home' width={16} height={16} className='w-4 h-4'/>
            <div>HomePage</div>
          </Link>
          <Link href="/" className='flex gap-1 items-center'>
            <Image src="/friends.png" alt='Friends' width={16} height={16} className='w-4 h-4'/>
            <div>Friends</div>
          </Link>
          <Link href="/" className='flex gap-1 items-center'>
            <Image src="/stories.png" alt='Stories' width={16} height={16} className='w-4 h-4'/>
            <div>Stories</div>
          </Link>
        </div>
      </div>
      {/* RIGHT */}
      <div className='w-[30%] flex items-center justify-end gap-4 xl:gap-8'>
        <MobileMenu />
      </div>
    </div>
  )
}

export default Navbar