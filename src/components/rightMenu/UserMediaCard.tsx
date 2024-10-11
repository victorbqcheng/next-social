import prisma from '@/lib/client';
import { User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type UserMediaCardProps = {
    user?: User;
};

const UserMediaCard = async ({ user }: UserMediaCardProps) => {

    const postsWithMedia = await prisma.post.findMany({
        where: {
            userId: user?.id,
            img: {
                not: null
            }
        },
        take: 8,
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <div className='p-4 bg-white shadow-md rounded-lg text-sm flex flex-col gap-4'>
            {/* TOP */}
            <div className='flex items-center justify-between font-medium'>
                <span className='text-gray-500'>User Media</span>
                <Link href='/' className='text-xs text-blue-500'>see all</Link>
            </div>
            {/* BOTTOM */}
            <div className='flex justify-between flex-wrap gap-2 w-full relative'>
                {
                    postsWithMedia.length ? postsWithMedia.map(post => (
                        <div key={post.id} className='w-1/5 relative h-24'>
                            <Image src={post.img!} alt=''
                                fill className='rounded-md object-cover' />
                        </div>
                    )):"No media found"
                }




            </div>
        </div>
    )
}

export default UserMediaCard