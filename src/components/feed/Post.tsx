import Image from 'next/image'
import React, { Suspense } from 'react'
import Comments from './Comments'
import { Post as PostModel, User } from '@prisma/client';
import { GetNameFromUser } from '@/lib/util';
import PostInteractions from './PostInteractions';
import PostMoreInteraction from './PostMoreInteraction';

export type PostWithLikesAndComments = PostModel & {
    user: User
    _count: {
        comments: number
    },
    likes: {
        userId: string
    }[]
}

type PostProps = {
    post: PostWithLikesAndComments
};

const Post = ({ post }: PostProps) => {
    return (
        <div className='flex flex-col gap-4'>
            {/* USER */}
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4 cursor-pointer'>
                    <Image src={post.user.avatar || '/noAvatar.png'}
                        alt="user" width={40} height={40} className='w-10 h-10 rounded-full' />
                    <span className='font-medium'>{GetNameFromUser(post.user)}</span>
                </div>
                <PostMoreInteraction post={post}/>
            </div>
            {/* DESCRIPTION */}
            <div className='flex flex-col gap-4'>
                {
                    post.img && <div className='w-full min-h-96 relative'>
                        <Image src={post.img} alt=""
                            fill className='object-cover rounded-md' />
                    </div>
                }
                <p>
                    {post.desc}
                </p>
            </div>
            {/* INTERACTION */}
            <Suspense fallback={<div>Loading...</div>}>
                <PostInteractions postId={post.id} likes={post.likes} commentNumber={post._count.comments} />
            </Suspense>
            {/* COMMENTS */}
            <Suspense fallback={<div>Loading...</div>}>
                <Comments postId={post.id} />
            </Suspense>
        </div>
    )
}

export default Post