"use client"
import { switchPostLike } from '@/lib/actions';
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image'
import React from 'react'

type PostInteractionsProps = {
    postId: number,
    likes: { userId: string }[],
    commentNumber: number
};

const PostInteractions = ({ postId, likes, commentNumber }: PostInteractionsProps) => {
    const { userId, isLoaded } = useAuth();
    
    const [likeState, setLikeState] = React.useState({
        likeCount: likes.length,
        isLiked: userId?likes.map(like=>like.userId).includes(userId):false
    });


    const likeAction = async () => {
        await switchPostLike(postId);
        setLikeState({
            likeCount: likeState.isLiked ? likeState.likeCount - 1 : likeState.likeCount + 1,
            isLiked: !likeState.isLiked
        });
    };

    return (
        <div className='flex items-center justify-between text-sm my-4'>
            <div className='flex gap-8'>
                {/* Likes */}
                <div className='flex items-center gap-4 bg-slate-50 rounded-xl p-2'>
                    <form action={likeAction}>
                        <button>
                            <Image src={likeState.isLiked ? "/liked.png" : "/like.png"} alt='like' width={20} height={20} className='cursor-pointer' />
                        </button>
                    </form>
                    <span className='text-gray-300'>|</span>
                    <span className='text-gray-500'>{likeState.likeCount} <span className='hidden md:inline'>Likes</span></span>
                </div>
                {/* Comments */}
                <div className='flex items-center gap-4 bg-slate-50 rounded-xl p-2'>
                    <Image src="/comment.png" alt='like' width={20} height={20} className='cursor-pointer' />
                    <span className='text-gray-300'>|</span>
                    <span className='text-gray-500'>{commentNumber} <span className='hidden md:inline'>Comments</span></span>
                </div>
            </div>
            <div>
                <div className='flex items-center gap-4 bg-slate-50 rounded-xl p-2'>
                    <Image src="/share.png" alt='like' width={20} height={20} className='cursor-pointer' />
                    <span className='text-gray-300'>|</span>
                    <span className='text-gray-500'><span className='hidden md:inline'>Share</span></span>
                </div>
            </div>
        </div>
    )
}

export default PostInteractions;
