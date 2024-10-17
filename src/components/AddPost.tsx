"use client"

import { auth } from '@clerk/nextjs/server';
import Image from 'next/image'
import React from 'react'
import AddPostButton from './AddPostButton';
import { useUser } from '@clerk/nextjs';
import { CldUploadWidget } from 'next-cloudinary';
import { addPost } from '@/lib/actions';

const AddPost = () => {

    const { user, isLoaded } = useUser();    // user_2n3mlffJwPyHz6o5aT90Qw4vuAx
    if (!isLoaded) return "Loading...";

    const [desc, setDesc] = React.useState('');
    const [img, setImg] = React.useState<any>();

    // console.log(userId);

    return (
        <div className='p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm'>
            {/* AVATAR */}
            <Image src={user?.imageUrl || "/noavatar.png"}
                width={48} height={48} alt='avatar'
                className='w-12 h-12 rounded-full object-cover' />
            {/* POST */}
            <div className='flex-1'>
                {/* TEXT INPUT */}
                <form action={(formData)=>addPost(formData, img.secure_url||"")} className='flex gap-4'>
                    <textarea placeholder="what's on your mind"
                        className='bg-slate-100 rounded-lg flex-1 p-2'
                        name='desc'
                        onChange={(e) => setDesc(e.target.value)} />
                    <div>
                        <Image src="/emoji.png" width={20} height={20} alt='emoji'
                            className='w-5 h-5 cursor-pointer self-end rounded-full object-cover' />
                        <AddPostButton />
                    </div>

                </form>
                {/* POST OPTIONS */}
                <div className='flex gap-4 items-center mt-4 text-gray-400 flex-wrap'>
                    <CldUploadWidget uploadPreset="next-social" onSuccess={(result, widget) => { setImg(result.info); widget.close() }}>
                        {({ open }) => {
                            return (
                                <div className='flex gap-2 items-center cursor-pointer' onClick={() => open()}>
                                    <Image src="/addImage.png" alt='addImage' width={20} height={20} />
                                    Photo
                                </div>
                            );
                        }}
                    </CldUploadWidget>

                    <div className='flex gap-2 items-center cursor-pointer'>
                        <Image src="/addVideo.png" alt='addImage' width={20} height={20} />
                        Video
                    </div>
                    <div className='flex gap-2 items-center cursor-pointer'>
                        <Image src="/addEvent.png" alt='addImage' width={20} height={20} />
                        Event
                    </div>
                    <div className='flex gap-2 items-center cursor-pointer'>
                        <Image src="/poll.png" alt='addImage' width={20} height={20} />
                        Poll
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPost