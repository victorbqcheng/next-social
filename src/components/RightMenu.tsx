import React from 'react'
import FriendRequests from './FriendRequests';
import Birthdays from './Birthdays';
import Ad from './Ad';
import UserInfoCard from './UserInfoCard';
import UserMediaCard from './UserMediaCard';
import { User } from '@prisma/client';

type RightMenuProps = {
    user?:User;
};

const RightMenu = ({user}:RightMenuProps) => {
    return (
        <div className='flex flex-col gap-6'>
            {
                user && <>
                    <UserInfoCard user={user}/>
                    <UserMediaCard user={user}/>
                </>
            }
            <FriendRequests />
            <Birthdays />
            <Ad size='md' />
        </div>
    )
}

export default RightMenu