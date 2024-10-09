import { User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type UserMediaCardProps = {
    user?:User;
};

const UserMediaCard = ({user}:UserMediaCardProps) => {
    return (
        <div className='p-4 bg-white shadow-md rounded-lg text-sm flex flex-col gap-4'>
            {/* TOP */}
            <div className='flex items-center justify-between font-medium'>
                <span className='text-gray-500'>User Media</span>
                <Link href='/' className='text-xs text-blue-500'>see all</Link>
            </div>
            {/* BOTTOM */}
            <div className='flex justify-between flex-wrap gap-2 w-full relative'>
                
                <div className='w-1/5 relative h-24'>
                    <Image src="https://images.pexels.com/photos/10509041/pexels-photo-10509041.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt=''
                           fill className='rounded-md object-cover'/>
                </div>
                
                <div className='w-1/5 relative h-24'>
                    <Image src="https://images.pexels.com/photos/10509041/pexels-photo-10509041.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt=''
                           fill className='rounded-md object-cover'/>
                </div>
                <div className='w-1/5 relative h-24'>
                    <Image src="https://images.pexels.com/photos/10509041/pexels-photo-10509041.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt=''
                           fill className='rounded-md object-cover'/>
                </div>
                <div className='w-1/5 relative h-24'>
                    <Image src="https://images.pexels.com/photos/10509041/pexels-photo-10509041.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt=''
                           fill className='rounded-md object-cover'/>
                </div>
                <div className='w-1/5 relative h-24'>
                    <Image src="https://images.pexels.com/photos/10509041/pexels-photo-10509041.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt=''
                           fill className='rounded-md object-cover'/>
                </div>
                
            </div>
        </div>
    )
}

export default UserMediaCard