"use client"

import { updateProfile, UpdateResult } from '@/lib/actions';
import { User } from '@prisma/client';
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'
import UpdateButton from './UpdateButton';

type UpdateUserProps = {
    user: User;
};

const UpdateUser = ({ user }: UpdateUserProps) => {
    const [open, setOpen] = React.useState(false);
    const [cover, setCover] = React.useState<any>();
    const [updateState, setUpdateState] = React.useState<UpdateResult>({ success: false, error: false });
    const router = useRouter();

    const handleCloseOverlay = () => {
        setOpen(false);
        updateState.success && router.refresh();
        setUpdateState({ success: false, error: false });
    };

    return (
        <div>
            <span className='text-blue-500 text-xs cursor-pointer' onClick={() => setOpen(true)}>Update</span>
            {/* overlay */}
            {open && <div className='absolute w-full h-full left-0 top-0 bg-black bg-opacity-65 flex justify-center items-center z-50'>

                <form action={(formData)=>updateProfile(formData, cover?.secure_url||"").then((s)=>setUpdateState(s))} className='flex flex-col gap-2 bg-white rounded-md shadow-md w-full md:w-1/2 xl:w-1/3 p-12 relative'>
                    {/* close button */}
                    <div className='absolute top-3 right-3 cursor-pointer text-xl' onClick={handleCloseOverlay}>X</div>
                    <h1>Update Profile</h1>
                    <span className='text-gray-500 text-xs'>Use the navbar profile to change the avatar or username</span>
                    {/* cover picture */}
                    <CldUploadWidget uploadPreset="next-social" onSuccess={(result)=>setCover(result.info)}>
                        {({ open }) => {
                            return (
                                <div className='flex flex-col gap-4 my-4' onClick={()=>open()}>
                                    <label htmlFor=''>Cover Picture</label>
                                    <div className='flex items-center gap-2 cursor-pointer'>
                                        <Image src={user.cover || "/nocover.png"} alt='' width={48} height={32}
                                            className='rounded-md w-12 h-8 object-cover' />
                                        <span className='text-sx text-gray-600 underline'>Change</span>
                                    </div>
                                </div>
                            );
                        }}
                    </CldUploadWidget>

                    {/* inputs */}
                    <div className='flex flex-wrap gap-2 xl:gap-4 justify-between'>
                        <div className='flex flex-col gap-4'>
                            <label htmlFor='' className='text-xs text-gray-500'>First Name</label>
                            <input name='name' type="text" placeholder={user.name || "John"} className='border border-gray-200 p-2 rounded-md text-sm' />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <label htmlFor='' className='text-xs text-gray-500'>Surname</label>
                            <input name='surname' type="text" placeholder={user.surname || "Doe"} className='border border-gray-200 p-2 rounded-md text-sm' />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <label htmlFor='' className='text-xs text-gray-500'>Description</label>
                            <input name='description' type="text" placeholder={user.description || "Life is beautiful..."} className='border border-gray-200 p-2 rounded-md text-sm' />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <label htmlFor='' className='text-xs text-gray-500'>City</label>
                            <input name='city' type="text" placeholder={user.city || "New York"} className='border border-gray-200 p-2 rounded-md text-sm' />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <label htmlFor='' className='text-xs text-gray-500'>School</label>
                            <input name='school' type="text" placeholder={user.school || "MIT"} className='border border-gray-200 p-2 rounded-md text-sm' />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <label htmlFor='' className='text-xs text-gray-500'>Work</label>
                            <input name='work' type="text" placeholder={user.work || "App Inc."} className='border border-gray-200 p-2 rounded-md text-sm' />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <label htmlFor='' className='text-xs text-gray-500'>Website</label>
                            <input name='website' type="text" placeholder={user.webset || ""} className='border border-gray-200 p-2 rounded-md text-sm' />
                        </div>
                    </div>
                    {
                        updateState.success && <span className='text-green-500'>Profile updated successfully</span>
                    }
                    {
                        updateState.error && <span className='text-red-500'>Something went wrong</span>
                    }
                    <UpdateButton />
                </form>
            </div>}
        </div>
    )
}

export default UpdateUser