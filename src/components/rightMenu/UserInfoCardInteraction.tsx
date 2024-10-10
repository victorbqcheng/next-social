"use client"

import { switchBlock, switchFollow } from '@/lib/actions';
import React from 'react'

type UserInfoCardInteractionProps = {
    userId: string;
    currentUserId: string;
    isUserBlocked: boolean;
    isFollowing: boolean;
    isFollowingSent: boolean;
};

const UserInfoCardInteraction = ({
    userId,
    currentUserId,
    isUserBlocked,
    isFollowing,
    isFollowingSent
}: UserInfoCardInteractionProps) => {
    console.log("entered UserInfoCardInteraction");
    const [useState, setUserState] = React.useState({
        following: isFollowing,
        blocked: isUserBlocked,
        followingRequestSent: isFollowingSent
    });

    const follow = async () => {
        try {
            await switchFollow(userId);
            setUserState(pre => (
                {
                    ...pre,
                    following: pre.following && false,
                    followingRequestSent: (!pre.following && !pre.followingRequestSent) ? true : false
                }
            ));
        } catch (error) {

        }
    };

    const block = async () => {
        try {
            await switchBlock(userId);
            setUserState(pre => ({
                ...pre,
                blocked: !pre.blocked
            }));
        } catch (error) {

        }
    };

    return (
        <>
            <form action={follow}>
                <button className='w-full bg-blue-600 text-white p-2 rounded-md'>
                    {useState.following ? "Unfollow" : useState.followingRequestSent ? "Friend request sent" : "Follow"}
                </button>
            </form>
            <form action={block} className='self-end'>
                <button type='submit'>
                    <span className='text-red-400 text-xs cursor-pointer self-end'>
                        {useState.blocked ? "Unblock User" : "Block User"}
                    </span>
                </button>
            </form>
        </>
    )
}

export default UserInfoCardInteraction