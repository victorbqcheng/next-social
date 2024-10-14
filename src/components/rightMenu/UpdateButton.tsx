import React from 'react'
import { useFormStatus } from 'react-dom'

const UpdateButton = () => {
    const {pending} = useFormStatus();
    return (
        <button className='bg-blue-500 text-white rounded-md p-2 mt-2 disabled:bg-opacity-50 disabled:cursor-not-allowed' disabled={pending}>
            {
                pending ? 'Updating...' : 'Update'
            }
        </button>
    )
}

export default UpdateButton