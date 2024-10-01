import Image from 'next/image'
import React from 'react'

const Comments = () => {
    return (
        <div>
            {/* WRITE */}
            <div className='flex items-center gap-4'>
                <Image src="https://images.pexels.com/photos/28571990/pexels-photo-28571990/free-photo-of-cozy-coffee-cup-on-wooden-table-indoors.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt=''
                    width={32} height={32} className='w-8 h-8 rounded-full' />
                <div className='bg-slate-100 flex items-center justify-between rounded-xl text-sm px-3 py-2 flex-1'>
                    <input type='text' placeholder='Write a comment...' 
                           className='bg-transparent outline-none flex-1' />
                    <Image src="/emoji.png" alt='send' width={16} height={16} className='cursor-pointer' />
                </div>

            </div>
            {/* COMMENTS */}
            <div className=''>
                {/* COMMENT */}
                <div className='flex gap-4 justify-between mt-6'>
                    {/* AVATAR */}
                    <Image src="https://images.pexels.com/photos/27669807/pexels-photo-27669807/free-photo-of-a-road-is-winding-through-the-mountains.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt=''
                           width={40} height={40} className='w-10 h-10 rounded-full'/>
                    {/* DESCRIPTION */}
                    <div className='flex flex-col gap-2 flex-1'>
                        <span className='font-medium'>Marian Wong</span>
                        <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab ut ipsum explicabo earum quae blanditiis nulla esse, sequi provident, voluptatibus enim corporis saepe ullam consequuntur, aliquam dolores ipsa asperiores! Magni!</p>
                        <div className='flex items-center text-sm gap-4'>
                            <div className='flex items-center gap-2 p-1 rounded-md cursor-pointer'>
                                <Image src="/like.png" alt='like' width={16} height={16}/>
                                <span className='text-gray-300'>|</span>
                                <span className='text-gray-500'>123 Likes</span>
                            </div>
                            <span className='text-gray-500 p-1 rounded-md cursor-pointer'>reply</span>
                        </div>
                    </div>
                    {/* MORE ICON */}
                    <Image src="/more.png" alt='more' width={16} height={16} className='cursor-pointer w-4 h-4' />
                </div>
            </div>
        </div>
    )
}

export default Comments