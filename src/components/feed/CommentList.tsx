"use client"

import { addComment } from '@/lib/actions';
import { GetNameFromUser } from '@/lib/util';
import { useUser } from '@clerk/nextjs';
import { Comment, PostLike, User } from '@prisma/client';
import Image from 'next/image'
import { comment } from 'postcss';
import React from 'react'

type CommentWithUser = Comment & {
    user: User
};

type CommentListProps = {
    postId: number,
    comments: CommentWithUser[]
};

const CommentList = ({ postId, comments }: CommentListProps) => {

    const { user } = useUser();
    const [desc, setDesc] = React.useState('');
    const [commentState, setCommentState] = React.useState<CommentWithUser[]>(comments);

    const add = async()=>{
        if(!desc || !user) return;
        
        try {
            const createdComment = await addComment(postId, desc);
            setCommentState([createdComment, ...commentState]);
        } catch (error) {
            
        }
    };

    return (
        <>
            {/* WRITE */}
            {user && <div className='flex items-center gap-4'>
                <Image src={user.imageUrl || "/noavatar.png"} alt=''
                    width={32} height={32} className='w-8 h-8 rounded-full' />
                <form action={add} className='bg-slate-100 flex items-center justify-between rounded-xl text-sm px-3 py-2 flex-1'>
                    <input type='text' placeholder='Write a comment...'
                        className='bg-transparent outline-none flex-1'
                        onChange={(e) => setDesc(e.target.value)} />
                    <Image src="/emoji.png" alt='send' width={16} height={16} className='cursor-pointer' />
                </form>
            </div>}

            {/* COMMENTS */}
            <div className=''>
                {/* COMMENT */}
                {
                    commentState.map(comment => <CommentListItem key={comment.id} comment={comment} />)
                }
            </div>
        </>
    )
}

export default CommentList

const CommentListItem = ({ comment }: { comment: CommentWithUser }) => {
    return (
        <>
            <div className='flex gap-4 justify-between mt-6'>
                {/* AVATAR */}
                <Image src={comment.user.avatar || "/noavartar.png"} alt=''
                    width={40} height={40} className='w-10 h-10 rounded-full' />
                {/* DESCRIPTION */}
                <div className='flex flex-col gap-2 flex-1'>
                    <span className='font-medium'>{GetNameFromUser(comment.user)}</span>
                    <p className='text-sm'>{comment.desc}</p>
                    <div className='flex items-center text-sm gap-4'>
                        <div className='flex items-center gap-2 p-1 rounded-md cursor-pointer'>
                            <Image src="/like.png" alt='like' width={16} height={16} />
                            <span className='text-gray-300'>|</span>
                            <span className='text-gray-500'>{0} Likes</span>
                        </div>
                        <span className='text-gray-500 p-1 rounded-md cursor-pointer'>reply</span>
                    </div>
                </div>
                {/* MORE ICON */}
                <Image src="/more.png" alt='more' width={16} height={16} className='cursor-pointer w-4 h-4' />
            </div>
        </>
    );
};
