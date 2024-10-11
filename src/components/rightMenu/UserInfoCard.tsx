
import prisma from '@/lib/client';
import { auth, currentUser } from '@clerk/nextjs/server';
import { User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import UserInfoCardInteraction from './UserInfoCardInteraction';

type UserInfoCardProps = {
    user?:User;
};

const UserInfoCard = async ({user}:UserInfoCardProps) => {
    const createdAt = new Date(user?.createdAt!);
    const formattedDate = createdAt.toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    let isUserBlocked = false;
    let isFollowing = false;
    let isFollowingSent = false;

    const {userId:currentUserId} = auth();
    if(currentUserId){
        const blockRes = await prisma.blockRequest.findFirst({
            where:{
                senderId: currentUserId,
                receiverId:user?.id
            }
        });
        isUserBlocked = blockRes?true:false;


        const followRes = await prisma.follower.findFirst({
            where:{
                followerId: currentUserId,
                followingId:user?.id
            }
        });
        isFollowing = followRes?true:false;

        const followReqRes = await prisma.followRequest.findFirst({
            where:{
                senderId: currentUserId,
                receiverId:user?.id
            }
        });
        isFollowingSent = followReqRes?true:false;
    }

    return (
        <div className='p-4 bg-white shadow-md rounded-lg text-sm'>
            {/* TOP */}
            <div className='flex items-center justify-between font-medium'>
                <span className='text-gray-500'>User Information</span>
                <Link href='/' className='text-xs text-blue-500'>see all</Link>
            </div>
            {/* BOTTOM */}
            <div className='flex flex-col gap-4 text-gray-500'>
                <div className='flex items-center gap-2'>
                    <span className='text-xl text-black'>{(user?.name&&user?.surname)?user.name+" "+user.surname:user?.username}</span>
                    <span className='text-sm'>@{user?.username}</span>
                </div>
                <p className='line-clamp-3'>{user?.description}</p>
                <div className='flex items-center gap-2'>
                    <Image src="/map.png" alt='' width={16} height={16}/>
                    <span>Living in <b>{user?.city}</b></span>
                </div>
                <div className='flex items-center gap-2'>
                    <Image src="/school.png" alt='' width={16} height={16}/>
                    <span>Went to <b>{user?.school}</b></span>
                </div>
                <div className='flex items-center gap-2'>
                    <Image src="/work.png" alt='' width={16} height={16}/>
                    <span>Works at <b>{user?.work}</b></span>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center text-sm text-blue-500 gap-1'>
                        <Image src="/link.png" alt='' width={16} height={16}/>
                        <Link href={user?.webset || "#"}>{user?.webset}</Link>
                    </div>
                    <div className='flex items-center text-sm gap-1'>
                        <Image src="/date.png" alt='' width={16} height={16}/>
                        <span>Joined {formattedDate}</span>
                    </div>
                </div>
                {(currentUserId&&currentUserId!==user?.id)&&<UserInfoCardInteraction userId={user?.id!}
                        isUserBlocked={isUserBlocked}
                        isFollowing={isFollowing}
                        isFollowingSent={isFollowingSent} />}
                
            </div>
        </div>
    )
}

export default UserInfoCard