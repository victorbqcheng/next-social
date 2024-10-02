import Image from 'next/image';
import React from 'react'

type AdProps = {
    size:"sm" | "md" | "lg";
}

const Ad = ({size}:AdProps) => {
    return (
        <div className='p-4 bg-white shadow-md rounded-lg text-sm'>
            {/* TOP */}
            <div className='flex items-center justify-between font-medium'>
                <span className='text-gray-500'>Sponsor Ads</span>
                <Image src="/more.png" alt='more' width={16} height={16} className='cursor-pointer' />
            </div>

            {/* BOTTOM */}
            <div className={`flex flex-col mt-4 ${size==="sm"?'gap-2':'gap-4'}`}>
                <div className={`relative w-full ${size==='sm'?'h-24':size==='md'?'h-36':'h-48'}`}>
                    <Image src="https://images.pexels.com/photos/10530970/pexels-photo-10530970.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt=''
                           fill className='object-cover rounded-lg'/>
                </div>
                <div className='flex items-center gap-4'>
                    <Image src="https://images.pexels.com/photos/10530970/pexels-photo-10530970.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt=''
                            width={24} height={24} className='object-cover rounded-full w-6 h-6'/>
                    <span className='text-blue-600 font-medium'>Coffee</span>
                </div>
                <p className={`${size==='sm'?'text-xs line-clamp-2':'text-sm line-clamp-3'}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, adipisci? Laudantium optio, nostrum voluptatem ea a fugit recusandae perferendis tenetur illo incidunt cumque ipsum temporibus nam provident iste dignissimos sapiente!</p>
                <button className='bg-slate-100 rounded-lg p-2'>Learn More</button>
            </div>
        </div>
    )
}

export default Ad