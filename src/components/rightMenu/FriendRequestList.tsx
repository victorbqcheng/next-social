"use client"

import { acceptFollowRequest } from '@/lib/actions';
import { FollowRequest, User } from '@prisma/client';
import Image from 'next/image';
import React from 'react'

type Request = FollowRequest & {
    sender: User;
};

type FriendRequestListProps = {
    requests: Request[];
}

const FriendRequestList = ({ requests }: FriendRequestListProps) => {

    const [requestsState, setRequestsState] = React.useState<Request[]>(requests);
    const onAccept = async (senderId:string, requestId:number) => {
        console.log("enter onAccept");
        try {
            await acceptFollowRequest(senderId);
            setRequestsState(requestsState.filter(request => request.id !== requestId));
        } catch (error) {
            
        }
    }
    const onDecline = async (senderId:string, requestId:number) => {
        try {
            await acceptFollowRequest(senderId);
            setRequestsState(requestsState.filter(request => request.id !== requestId));
        } catch (error) {
            
        }
    };
    return (
        <>
            {
                requestsState.map(request => <FriendRequestItem key={request.id} sender={request.sender} 
                                            onAccept={()=>onAccept(request.senderId, request.id)} 
                                            onDecline={()=>onDecline(request.senderId, request.id)}/>)
            }
        </>
    )
}
type FriendRequestItemProps = {
    sender: User;
    onAccept?: () => void;
    onDecline?: () => void;

};
const FriendRequestItem = ({ sender, onAccept, onDecline }: FriendRequestItemProps) => {
    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
                {/* AVATAR */}
                <Image src={sender.avatar || "/noavatar.png"} alt=''
                    width={40} height={40} className='w-10 h-10 rounded-full' />

                {/* NAME */}
                <span className='font-medium'>{(sender.name && sender.surname) ? sender.name + " " + sender.surname : sender.username}</span>
            </div>
            <div className='flex items-center gap-2'>
                {/* ICONS */}
                <Image src="/accept.png" alt='accept' width={20} height={20} className='cursor-pointer' onClick={onAccept} />
                <Image src="/reject.png" alt='reject' width={20} height={20} className='cursor-pointer' onClick={onDecline} />
            </div>
        </div>
    );
}

export default FriendRequestList