import React from 'react'
import ProfileCard from './ProfileCard';
import Link from 'next/link';
import Image from 'next/image';
import Ad from '../Ad';

type LeftMenuProps = {
    type: "home" | "profile";
};

const LeftMenu = ({ type }: LeftMenuProps) => {
    return (
        <div className='flex flex-col gap-6'>
            {type === 'home' && <ProfileCard />}
            <div className='p-6 bg-white shadow-md rounded-lg text-sm text-gray-500 flex flex-col gap-2'>
                <LeftMenuItem icon='/posts.png' text='My Posts' href='/'/>
                <hr className=' border-gray-100 w-36 self-center'/>
                <LeftMenuItem icon='/activity.png' text='Activity' href='/'/>
                <hr className=' border-gray-100 w-36 self-center'/>
                <LeftMenuItem icon='/market.png' text='Marketplace' href='/'/>
                <hr className=' border-gray-100 w-36 self-center'/>
                <LeftMenuItem icon='/events.png' text='Events' href='/'/>
                <hr className=' border-gray-100 w-36 self-center'/>

                <LeftMenuItem icon='/Albums.png' text='Albums' href='/'/>
                <hr className=' border-gray-100 w-36 self-center'/>
                <LeftMenuItem icon='/videos.png' text='Videos' href='/'/>
                <hr className=' border-gray-100 w-36 self-center'/>
                <LeftMenuItem icon='/news.png' text='News' href='/'/>
                <hr className=' border-gray-100 w-36 self-center'/>
                <LeftMenuItem icon='/courses.png' text='Courses' href='/'/>
                <hr className=' border-gray-100 w-36 self-center'/>
                <LeftMenuItem icon='/lists.png' text='Lists' href='/'/>
                <hr className=' border-gray-100 w-36 self-center'/>
                <LeftMenuItem icon='/settings.png' text='Settings' href='/'/>
            </div>
            <Ad size='sm' />
        </div>
    )
}

type LeftMenuItemProps = {
    icon: string;
    text: string;
    href: string;
};

const LeftMenuItem = ({icon, text, href}:LeftMenuItemProps) => {
    return (
        <Link href={href} className='flex items-center gap-4 p-2 rounded-md hover:bg-slate-100'>
            <Image src={icon} alt='' width={20} height={20} />
            <span>{text}</span>
        </Link>
    );
};

export default LeftMenu