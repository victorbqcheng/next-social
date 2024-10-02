import React from 'react'
import FriendRequests from './FriendRequests';
import Birthdays from './Birthdays';
import Ad from './Ad';
import UserInfoCard from './UserInfoCard';
import UserMediaCard from './UserMediaCard';

type RightMenuProps = {
    userId?:string;
};

const RightMenu = ({userId}:RightMenuProps) => {
    return (
        <div className='flex flex-col gap-6'>
            {
                userId && <>
                    <UserInfoCard />
                    <UserMediaCard />
                </>
            }
            <FriendRequests />
            <Birthdays />
            <Ad size='md' />
        </div>
    )
}

export default RightMenu