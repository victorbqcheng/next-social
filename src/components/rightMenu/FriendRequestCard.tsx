import prisma from '@/lib/client'
import { auth } from '@clerk/nextjs/server'
import { FollowRequest, User } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import FriendRequestList from './FriendRequestList'

const FriendRequestCard = async () => {

    const {userId:currentUserId} = auth();
    if(!currentUserId) return null;

    const requests = await prisma.followRequest.findMany({
        where:{
            receiverId: currentUserId
        },
        include:{
            sender: true
        }
    });

    if(requests.length === 0) return null;


    return (
        <div className='p-4 bg-white shadow-md rounded-lg text-sm flex flex-col gap-4'>
            {/* TOP */}
            <div className='flex items-center justify-between font-medium'>
                <span className='text-gray-500'>Friend Requests</span>
                <Link href='/' className='text-xs text-blue-500'>see all</Link>
            </div>
            {/* BOTTOM */}
            <div className='flex flex-col gap-4'>
                <FriendRequestList requests={requests}/>
            </div>
        </div>
    )
}





export default FriendRequestCard