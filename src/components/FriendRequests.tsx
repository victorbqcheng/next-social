import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const FriendRequests = () => {
    return (
        <div className='p-4 bg-white shadow-md rounded-lg text-sm flex flex-col gap-4'>
            {/* TOP */}
            <div className='flex items-center justify-between font-medium'>
                <span className='text-gray-500'>Friend Requests</span>
                <Link href='/' className='text-xs text-blue-500'>see all</Link>
            </div>
            {/* BOTTOM */}
            <div className='flex flex-col gap-4'>
                <FriendRequestItem />
                <FriendRequestItem />
                <FriendRequestItem />
            </div>
        </div>
    )
}

const FriendRequestItem = ()=>{
    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
                {/* AVATAR */}
                <Image src="https://images.pexels.com/photos/27603834/pexels-photo-27603834/free-photo-of-ao-dai.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt=''
                       width={40} height={40} className='w-10 h-10 rounded-full'/>

                {/* NAME */}
                <span className='font-medium'>John Doe</span>
            </div>
            <div className='flex items-center gap-2'>
                {/* ICONS */}
                <Image src="/accept.png" alt='accept' width={20} height={20} className='cursor-pointer'/>
                <Image src="/reject.png" alt='reject' width={20} height={20} className='cursor-pointer'/>
            </div>
        </div>
    );
}

export default FriendRequests