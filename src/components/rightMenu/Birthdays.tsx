import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Birthdays = () => {
    return (
        <div className='p-4 bg-white shadow-md rounded-lg text-sm flex flex-col gap-4'>
            {/* TOP */}
            <div className='flex items-center justify-between font-medium'>
                <span className='text-gray-500'>Birthdays</span>
            </div>
            <BirthdayItem />
            {/* UPCOMMING */}
            <div className='p-4 flex items-center gap-4 rounded-lg bg-slate-100'>
                <Image src="/gift.png" alt='gift' width={24} height={24}/>
                <Link href="/" className='flex flex-col gap-2 text-xs'>
                    <span className='text-gray-700 font-semibold'>Upcomming birthdays</span>
                    <span className='text-gray-500'>See other 16 have upcomming birthdays</span>
                </Link>
            </div>
        </div>
    )
}

const BirthdayItem = ()=>{
    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
                {/* AVATAR */}
                <Image src="https://images.pexels.com/photos/27603834/pexels-photo-27603834/free-photo-of-ao-dai.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt=''
                       width={24} height={24} className='w-10 h-10 rounded-full'/>

                {/* NAME */}
                <span className='font-medium'>John Doe</span>
            </div>
            <button className='bg-blue-500 rounded-md px-2 py-1 text-xs text-white'>
                {/* ICONS */}
                celebrate
            </button>
        </div>
    );
};

export default Birthdays