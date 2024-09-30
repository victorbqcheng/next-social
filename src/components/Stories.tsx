"use client"
import Image from 'next/image'
import React from 'react'

const storyData = [
  {
    name: 'Lula',
    imgUrl: 'https://images.pexels.com/photos/28483666/pexels-photo-28483666/free-photo-of-snail-on-dry-branch-in-natural-setting.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
  },
  {
    name: 'Lula',
    imgUrl: 'https://images.pexels.com/photos/28483666/pexels-photo-28483666/free-photo-of-snail-on-dry-branch-in-natural-setting.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
  },
  {
    name: 'Lula',
    imgUrl: 'https://images.pexels.com/photos/28483666/pexels-photo-28483666/free-photo-of-snail-on-dry-branch-in-natural-setting.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
  },
  {
    name: 'Lula',
    imgUrl: 'https://images.pexels.com/photos/28483666/pexels-photo-28483666/free-photo-of-snail-on-dry-branch-in-natural-setting.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
  },
  {
    name: 'Lula',
    imgUrl: 'https://images.pexels.com/photos/28483666/pexels-photo-28483666/free-photo-of-snail-on-dry-branch-in-natural-setting.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
  },
];

const Stories = () => {
  return (
    <div className='p-4 bg-white rounded-lg shadow-md overflow-scroll text-xs scrollbar-hide'>
      <div className='flex gap-8 w-max'>
        {
          storyData.map((story, index) => (
            <div key={index}>
              <div className='flex flex-col gap-2 items-center cursor-pointer'>
                <Image src={story.imgUrl}
                  alt='story' width={80} height={80} className='w-20 h-20 rounded-full ring-2' />
                <span>{story.name}</span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Stories