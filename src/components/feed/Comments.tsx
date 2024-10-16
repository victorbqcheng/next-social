import Image from 'next/image'
import React from 'react'
import CommentList from './CommentList'
import prisma from '@/lib/client'

const Comments = async ({postId}:{postId:number}) => {
    const comments = await prisma.comment.findMany({
        where:{
            postId
        },
        include:{
            user:true
        },
        orderBy:{
            createdAt:'desc'
        }
    });

    return (
        <div>
            <CommentList postId={postId} comments={comments}/>
        </div>
    )
}

export default Comments