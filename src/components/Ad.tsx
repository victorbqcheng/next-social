import React from 'react'

type AdProps = {
    size:"sm" | "md" | "lg";
}

const Ad = ({size}:AdProps) => {
    return (
        <div className='p-4 bg-white shadow-md rounded-lg'>
            Ad
        </div>
    )
}

export default Ad