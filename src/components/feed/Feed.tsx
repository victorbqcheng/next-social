import React from 'react'
import Post, { PostWithLikesAndComments } from './Post'
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/client';
import { Post as PostModel } from '@prisma/client';

type FeedProps = {
    username?: string
};

const Feed = async ({ username }: FeedProps) => {
    console.log("enter Feed, username:", username);
    const { userId: currentUserId } = auth();
    let posts:PostWithLikesAndComments[];

    // on profile page
    if (username) {
        posts = await prisma.post.findMany({
            where: {
                user: {
                    username: username
                }
            },
            include: {
                user: true,
                likes: {
                    select: {
                        userId: true
                    }
                },
                _count: {
                    select: {
                        comments: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    // on home page
    if (!username && currentUserId) {
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
        posts = await prisma.post.findMany({
            where: {
                userId: {
                    in: followingIds
                }
            },
            include: {
                user: true,
                likes: {
                    select: {
                        userId: true
                    }
                },
                _count: {
                    select: {
                        comments: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }


    return (
        <div className='p-4 bg-white shadow-md rounded-lg flex flex-col gap-12'>
            {
                posts!.length?(
                    posts!.map(post => <Post key={post.id} post={post} />)
                ):"No posts found"
            }
            
        </div>
    )
}

export default Feed