"use client"
import Link from 'next/link'
import React from 'react'
import MobileMenu from './MobileMenu'
import Image from 'next/image'
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'


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
            <Image src="/home.png" alt='Home' width={16} height={16} className='w-4 h-4' />
            <div>HomePage</div>
          </Link>
          <Link href="/" className='flex gap-1 items-center'>
            <Image src="/friends.png" alt='Friends' width={16} height={16} className='w-4 h-4' />
            <div>Friends</div>
          </Link>
          <Link href="/" className='flex gap-1 items-center'>
            <Image src="/stories.png" alt='Stories' width={16} height={16} className='w-4 h-4' />
            <div>Stories</div>
          </Link>
        </div>
      </div>
      {/* RIGHT */}
      <div className='w-[30%] flex items-center justify-end gap-4 xl:gap-8'>
        <ClerkLoading>
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" role="status">
          </div>
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <div className='cursor-pointer'>
              <Image src="/people.png" alt='people' width={20} height={20} />
            </div>
            <div className='cursor-pointer'>
              <Image src="/messages.png" alt='people' width={20} height={20} />
            </div>
            <div className='cursor-pointer'>
              <Image src="/notifications.png" alt='people' width={20} height={20} />
            </div>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className='flex gap-2 items-center'>
              <Image src="/login.png" alt='people' width={20} height={20} className='w-6 h-6'/>
              <Link href="/sign-in" className='text-blue-600 text-sm'>Sign In/Register</Link>
            </div>
          </SignedOut>
        </ClerkLoaded>
        <MobileMenu />
      </div>
    </div>
  )
}

export default Navbar