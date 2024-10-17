"use client"

import React from 'react'
import { useFormStatus } from 'react-dom'

const AddPostButton = () => {
    const { pending } = useFormStatus();
    return (
        <div className='flex items-center'>
            <button disabled={pending}
                className='bg-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed text-white p-2 mt-2 rounded-md'>
                {pending?"Sending":"Send"}
            </button>
        </div>
    )
}

export default AddPostButton