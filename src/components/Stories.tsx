
import prisma from '@/lib/client';
import { auth } from '@clerk/nextjs/server';
import React from 'react'
import StoryList from './StoryList';

type StorriesProps = {
    
};

const Stories = async ({}:StorriesProps) => {
    const { userId: currentUserId } = auth();
    if(!currentUserId) return null;

    const following = await prisma.follower.findMany({
        where: {
            followerId: currentUserId
        },
        select: {
            followingId: true
        }
    });
    // console.log("following:",following);
    const followingIds = following.map(f => f.followingId);
    const ids = [...followingIds, currentUserId];


    const stories = await prisma.story.findMany({
        where:{
            userId:{
                in: ids
            },
            expiresAt:{
                gt: new Date()
            }
        },
        include:{
            user:true
        }
    });

    return (
        <div className='p-4 bg-white rounded-lg shadow-md overflow-scroll text-xs scrollbar-hide'>
            <StoryList stories={stories} />
        </div>
    )
}

export default Stories