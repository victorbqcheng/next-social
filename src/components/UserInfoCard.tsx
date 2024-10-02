import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type UserInfoCardProps = {
    userId?:string;
};

const UserInfoCard = ({userId}:UserInfoCardProps) => {
    return (
        <div className='p-4 bg-white shadow-md rounded-lg text-sm'>
            {/* TOP */}
            <div className='flex items-center justify-between font-medium'>
                <span className='text-gray-500'>User Information</span>
                <Link href='/' className='text-xs text-blue-500'>see all</Link>
            </div>
            {/* BOTTOM */}
            <div className='flex flex-col gap-4 text-gray-500'>
                <div className='flex items-center gap-2'>
                    <span className='text-xl text-black'>Joe Jones</span>
                    <span className='text-sm'>@username</span>
                </div>
                <p className='line-clamp-3'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus debitis, accusantium explicabo dignissimos vitae ratione illo veniam vel modi dicta fuga eum, facere culpa repellendus consequuntur saepe, ad fugit!</p>
                <div className='flex items-center gap-2'>
                    <Image src="/map.png" alt='' width={16} height={16}/>
                    <span>Living in <b>Denver</b></span>
                </div>
                <div className='flex items-center gap-2'>
                    <Image src="/school.png" alt='' width={16} height={16}/>
                    <span>Went to <b>Edgar High School</b></span>
                </div>
                <div className='flex items-center gap-2'>
                    <Image src="/work.png" alt='' width={16} height={16}/>
                    <span>Works at <b>App Inc.</b></span>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center text-sm text-blue-500 gap-1'>
                        <Image src="/link.png" alt='' width={16} height={16}/>
                        <Link href="/">github.com</Link>
                    </div>
                    <div className='flex items-center text-sm gap-1'>
                        <Image src="/date.png" alt='' width={16} height={16}/>
                        <span>Joined November 2024</span>
                    </div>
                </div>
                <button className='bg-blue-600 text-white p-2 rounded-md'>Following</button>
                <span className='text-red-400 text-xs cursor-pointer self-end'>Block User</span>
            </div>
        </div>
    )
}

export default UserInfoCard