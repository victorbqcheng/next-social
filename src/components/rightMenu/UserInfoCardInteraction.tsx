import React from 'react'

type UserInfoCardInteractionProps = {
    userId:string;
    currentUserId:string;
    isUserBlocked:boolean;
    isFollowing:boolean;
    isFollowingSent:boolean;
};

const UserInfoCardInteraction = ({
    userId,
    currentUserId,
    isUserBlocked,
    isFollowing,
    isFollowingSent
}:UserInfoCardInteractionProps) => {
  return (
    <>
        <button className='bg-blue-600 text-white p-2 rounded-md'>
            {isFollowing?"Unfollow":isFollowingSent?"Friend request sent":"Follow"}
        </button>
        <span className='text-red-400 text-xs cursor-pointer self-end'>
            {isUserBlocked?"Unblock User":"Block User"}
        </span>
    </>
  )
}

export default UserInfoCardInteraction