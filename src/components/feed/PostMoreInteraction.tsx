"use client"

import { deletePost } from '@/lib/actions';
import { useUser } from '@clerk/nextjs';
import { Post as PostModel, User } from '@prisma/client';
import Image from 'next/image'
import React, { useRef } from 'react'

type PostWithUser = PostModel & {
    user: User;
}

type PostMoreInteractionProps = {
    post: PostWithUser;
}

const PostMoreInteraction = ({ post }: PostMoreInteractionProps) => {
    const [open, setOpen] = React.useState(false);
    const { user } = useUser();
    const menuRef = useRef<HTMLDivElement>(null);

    const deletePostWithId = async () => {
        try {
            await deletePost(post.id);
        } catch (error) {

        }
    };
    return (
        <div className="relative bg-slate-400">
            <Image src="/more.png" alt='more' width={16} height={16} className='cursor-pointer' onClick={() => {setOpen(pre => !pre); menuRef.current?.focus()}} />
            {
                open && <div ref={menuRef}
                             tabIndex={0}
                             className='absolute top-4 right-0 w-32 bg-white shadow-xl rounded-lg text-xs p-4 z-30 flex flex-col gap-2'
                             onBlur={()=>setOpen(false)}
                             onFocus={() => console.log('Div focused')}>
                    <span className='cursor-pointer'>View</span>
                    {
                        post.user.id === user?.id && (
                            <>
                                <span className='cursor-pointer'>Re-post</span>
                                <form action={() => deletePostWithId()}>
                                    <button className='text-red-500'>Delete</button>
                                </form>
                            </>
                        )
                    }

                </div>
            }
        </div>
    )
}

export default PostMoreInteraction