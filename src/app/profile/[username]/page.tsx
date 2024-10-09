import Feed from '@/components/feed/Feed'
import LeftMenu from '@/components/leftMenu/LeftMenu'
import RightMenu from '@/components/rightMenu/RightMenu'
import prisma from '@/lib/client'
import { auth } from '@clerk/nextjs/server'
import { User } from '@prisma/client'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'

type ProfilePageProps = {
    params:{
        username:string
    }
};

const ProfilePage = async ({params}:ProfilePageProps) => {
    const username = params.username;
    const user = await prisma.user.findFirst({
        where:{
            username
        },
        include:{
            _count:{
                select:{
                    followers: true,
                    followings: true,
                    posts: true
                }
            }
        }
    });
    if(!user) return notFound();

    const {userId:currentUserId} = auth();
    let isBlocked = false;
    if(currentUserId){
        const blockRequest = await prisma.blockRequest.findFirst({
            where:{
                senderId: user.id,
                receiverId: currentUserId!
            }
        });
        if(blockRequest) isBlocked = true;
    }
    if(isBlocked) return notFound();

    return (
        <div className='flex gap-6 pt-6'>
            {/* LEFT */}
            <div className=" hidden xl:block w-[20%]">
                <LeftMenu type='profile' />
            </div>
            {/* CENTER */}
            <div className=" w-full lg:w-[70%] xl:w-[50%] ">
                <div className="flex flex-col gap-6">
                    <ProfilepageCard user={user}/>
                    <Feed />
                </div>
            </div>
            {/* RIGHT */}
            <div className=" hidden lg:block w-[30%]">
                <RightMenu user={user} />
            </div>
        </div>
    )
}

type ProfilepageCardProps = {
    user: User & {
        _count:{
            followers: number,
            followings: number,
            posts: number
        }
    }
};

const ProfilepageCard = ({user}:ProfilepageCardProps) => {
    return (
        <div className='flex flex-col gap-5 items-center'>
            <div className='relative h-64 w-full'>
                <Image src={user.cover || "/nocover.png"} alt=""
                    fill className='object-cover' />
                <Image src={user.avatar || "/noavatar.png"} alt=""
                    width={112} height={112} className='absolute rounded-full ring-white ring-2 w-28 h-28 object-cover left-0 right-0 m-auto -bottom-14' />
            </div>
            <span className='mt-12 font-semibold text-xl'>{(user.name&&user.surname)?user.name + " "+ user.surname:user.username}</span>
            <div className='flex gap-8 text-sm'>
                <div className='flex flex-col items-center'>
                    <span className='font-semibold'>{user._count.posts}</span>
                    <span className='text-gray-800'>Posts</span>
                </div>
                <div className='flex flex-col items-center'>
                    <span className='font-semibold'>{user._count.followers}</span>
                    <span className='text-gray-800'>Followers</span>
                </div>
                <div className='flex flex-col items-center'>
                    <span className='font-semibold'>{user._count.followings}</span>
                    <span className='text-gray-800'>Following</span>
                </div>
            </div>
        </div>
    );
};


export default ProfilePage