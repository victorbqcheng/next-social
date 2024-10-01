import Image from 'next/image'
import React from 'react'

const Post = () => {
    return (
        <div className='flex flex-col gap-4'>
            {/* USER */}
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4 cursor-pointer'>
                    <Image src="https://images.pexels.com/photos/27603834/pexels-photo-27603834/free-photo-of-ao-dai.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                        alt="user" width={40} height={40} className='w-10 h-10 rounded-full' />
                    <span className='font-medium'>Viola Miles</span>
                </div>
                <Image src="/more.png" alt='more' width={16} height={16} className='cursor-pointer' />
            </div>
            {/* DESCRIPTION */}
            <div className='flex flex-col gap-4'>
                <div className='w-full min-h-96 relative'>
                    <Image src="https://images.pexels.com/photos/28557571/pexels-photo-28557571/free-photo-of-scenic-alley-view-of-porto-cathedral-at-daytime.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt=""
                        fill className='object-cover rounded-md' />
                </div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quaerat explicabo aliquid earum, exercitationem adipisci iusto tenetur
                    iure ratione enim quas inventore eaque, distinctio, quos obcaecati
                    omnis doloribus voluptatibus! Voluptatum, odio.
                </p>
            </div>
            {/* INTERACTION */}
            <div className='flex items-center justify-between text-sm my-4'>
                <div className='flex gap-8'>
                    {/* Likes */}
                    <div className='flex items-center gap-4 bg-slate-50 rounded-xl p-2'>
                        <Image src="/like.png" alt='like' width={20} height={20} className='cursor-pointer' />
                        <span className='text-gray-300'>|</span>
                        <span className='text-gray-500'>123 <span className='hidden md:inline'>Likes</span></span>
                    </div>
                    {/* Comments */}
                    <div className='flex items-center gap-4 bg-slate-50 rounded-xl p-2'>
                        <Image src="/comment.png" alt='like' width={20} height={20} className='cursor-pointer' />
                        <span className='text-gray-300'>|</span>
                        <span className='text-gray-500'>123 <span className='hidden md:inline'>Comments</span></span>
                    </div>
                </div>
                <div>
                    <div className='flex items-center gap-4 bg-slate-50 rounded-xl p-2'>
                        <Image src="/share.png" alt='like' width={20} height={20} className='cursor-pointer' />
                        <span className='text-gray-300'>|</span>
                        <span className='text-gray-500'>123 <span className='hidden md:inline'>Shares</span></span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Post