"use client"

import { addStory } from '@/lib/actions';
import { GetNameFromUser } from '@/lib/util';
import { useUser } from '@clerk/nextjs';
import { Story, User } from '@prisma/client';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import React from 'react'

type StoryWithUser = Story & {
    user: User;
};

type StoryListProps = {
    stories: StoryWithUser[];
};

const StoryList = ({ stories }: StoryListProps) => {
    const [storyListState, setStoryListState] = React.useState<StoryWithUser[]>(stories);
    const [img, setImg] = React.useState<any>();

    const { user: currentUser, isLoaded } = useUser();
    if(!isLoaded) return null;

    const add = async()=>{
        if(!img) return;
        try {
            const createdStory = await addStory(img.secure_url);
            setStoryListState([createdStory, ...storyListState.filter(story=>story.user.id!==currentUser?.id)]);
            setImg(null);
        } catch (error) {
            
        }
    };

    return (
        <div className='flex gap-8 w-max'>
            <CldUploadWidget uploadPreset="next-social" onSuccess={(result, widget) => { setImg(result.info); widget.close() }}>
                {({ open }) => {
                    return (
                        <div className='flex flex-col gap-2 items-center cursor-pointer relative'>
                            <Image src={img?.secure_url || currentUser?.imageUrl || "/noavatar.png"}
                                alt='story' width={80} height={80} className='w-20 h-20 rounded-full ring-2 object-cover'
                                onClick={()=>open()} />
                            {
                                img?<form action={add}>
                                    <button className='bg-blue-500 text-xs p-1 rounded-md text-white'>Send</button>
                                </form>:<span>Add a story</span>
                            }
                            
                            <div className='absolute text-6xl text-gray-200 top-1 pointer-events-none'>+</div>
                        </div>
                    );
                }}
            </CldUploadWidget>
            {
                storyListState.map((story, index) => (
                    <div key={index}>
                        <div className='flex flex-col gap-2 items-center cursor-pointer'>
                            <Image src={story.user.avatar || "/noavatar.png"}
                                alt='story' width={80} height={80} className='w-20 h-20 rounded-full ring-2' />
                            <span>{GetNameFromUser(story.user)}</span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default StoryList