import Feed from '@/components/Feed'
import LeftMenu from '@/components/LeftMenu'
import RightMenu from '@/components/RightMenu'
import prisma from '@/lib/client'
import Image from 'next/image'
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
        }
    });
    
    return (
        <div className='flex gap-6 pt-6'>
            {/* LEFT */}
            <div className=" hidden xl:block w-[20%]">
                <LeftMenu type='profile' />
            </div>
            {/* CENTER */}
            <div className=" w-full lg:w-[70%] xl:w-[50%] ">
                <div className="flex flex-col gap-6">
                    <ProfilepageCard />
                    <Feed />
                </div>
            </div>
            {/* RIGHT */}
            <div className=" hidden lg:block w-[30%]">
                <RightMenu userId='12345' />
            </div>
        </div>
    )
}

const ProfilepageCard = () => {
    return (
        <div className='flex flex-col gap-5 items-center'>
            <div className='relative h-64 w-full'>
                <Image src="https://images.pexels.com/photos/14266208/pexels-photo-14266208.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt=""
                    fill className='object-cover' />
                <Image src="https://images.pexels.com/photos/28647129/pexels-photo-28647129/free-photo-of-woman-in-white-dress-with-floral-wreath-outdoors.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt=""
                    width={112} height={112} className='absolute rounded-full ring-white ring-2 w-28 h-28 object-cover left-0 right-0 m-auto -bottom-14' />
            </div>
            <span className='mt-12 font-semibold text-xl'>Joe Jones</span>
            <div className='flex gap-8 text-sm'>
                <div className='flex flex-col items-center'>
                    <span className='font-semibold'>142</span>
                    <span className='text-gray-800'>Posts</span>
                </div>
                <div className='flex flex-col items-center'>
                    <span className='font-semibold'>1.2K</span>
                    <span className='text-gray-800'>Followers</span>
                </div>
                <div className='flex flex-col items-center'>
                    <span className='font-semibold'>1.4K</span>
                    <span className='text-gray-800'>Following</span>
                </div>
            </div>
        </div>
    );
};


export default ProfilePage