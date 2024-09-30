import Image from 'next/image'
import React from 'react'

const AddPost = () => {
  return (
    <div className='p-4 bg-white rounded-lg flex gap-4 justify-between text-sm'>
      {/* AVATAR */}
      <Image src="https://images.pexels.com/photos/6062045/pexels-photo-6062045.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
        width={48} height={48} alt='avatar'
        className='w-12 h-12 rounded-full object-cover'>

      </Image>
      {/* POST */}
      <div className='flex-1'>
        {/* TEXT INPUT */}
        <div className='flex gap-4'>
          <textarea placeholder="what's on your mind" className='bg-slate-100 rounded-lg flex-1 p-2'></textarea>
          <Image src="/emoji.png" width={20} height={20} alt='emoji'
            className='w-5 h-5 cursor-pointer self-end rounded-full object-cover' />
        </div>
        {/* POST OPTIONS */}
        <div className='flex gap-4 items-center mt-4 text-gray-400 flex-wrap'>
          <div className='flex gap-2 items-center cursor-pointer'>
            <Image src="/addImage.png" alt='addImage' width={20} height={20} />
            Photo
          </div>
          <div className='flex gap-2 items-center cursor-pointer'>
            <Image src="/addVideo.png" alt='addImage' width={20} height={20} />
            Video
          </div>
          <div className='flex gap-2 items-center cursor-pointer'>
            <Image src="/addEvent.png" alt='addImage' width={20} height={20}/>
            Event
          </div>
          <div className='flex gap-2 items-center cursor-pointer'>
            <Image src="/poll.png" alt='addImage' width={20} height={20}/>
            Poll
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPost