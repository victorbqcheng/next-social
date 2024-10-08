import prisma from '@/lib/client';
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import React from 'react'

const ProfileCard = async () => {
    const {userId} = auth();
    if(!userId) return null;

    const user = await prisma.user.findFirst({
        where:{
            id: userId
        },
        include:{
            _count:{
                select:{
                    followers:true
                }
            }
        }
    });

    console.log("user: ", user);
    if(!user) return null;

    return (
        <div className='p-4 bg-white shadow-md rounded-lg text-sm flex flex-col items-center'>
            <div className=' relative h-20 w-full'>
                <Image src={user.cover || "/nocover.png"} alt=''
                    fill className='  object-cover rounded-md' />

                <Image src={user.avatar||"/noavatar.png"}
                    width={48} height={48} alt='avatar'
                    className=' absolute left-1 right-0 m-auto -bottom-6 w-12 h-12 rounded-full object-cover ring-white ring-1' />
            </div>


            <span className='mt-6 font-semibold'>{(user.name&&user.surname)?user.name+" " + user.surname:user.username}</span>
            <div className='m-2 flex items-center gap-2'>
                <div className='flex items-center '>
                    <Image src="https://images.pexels.com/photos/6062045/pexels-photo-6062045.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                        width={12} height={12} alt='avatar'
                        className=' w-3 h-3 rounded-full' />
                    <Image src="https://images.pexels.com/photos/6062045/pexels-photo-6062045.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                        width={12} height={12} alt='avatar'
                        className=' w-3 h-3 rounded-full' />
                    <Image src="https://images.pexels.com/photos/6062045/pexels-photo-6062045.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                        width={12} height={12} alt='avatar'
                        className=' w-3 h-3 rounded-full' />
                </div>
                <span className='text-gray-500 text-xs p-2'>{user._count.followers} followers</span>
            </div>

            <button className='bg-blue-500 rounded-md p-2 text-white'>My Profile</button>
        </div>
    )
}

export default ProfileCard