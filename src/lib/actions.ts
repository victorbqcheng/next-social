"use server"

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const switchFollow = async(userId:string)=>{

    const {userId: currentUserId} = auth();
    if(!currentUserId) {
        throw new Error("User is not authenticated");
    }

    try {
        const existingFollow = await prisma.follower.findFirst({
            where:{
                followerId: currentUserId,
                followingId: userId
            }
        });
        if(existingFollow){
            await prisma.follower.delete({
                where:{
                    id: existingFollow.id
                }
            });
        }else{
            const existingFollowRequest = await prisma.followRequest.findFirst({
                where:{
                    senderId: currentUserId,
                    receiverId: userId
                }
            });
            if(existingFollowRequest){
                await prisma.followRequest.delete({
                    where:{
                        id: existingFollowRequest.id
                    }
                });
            } else {
                await prisma.followRequest.create({
                    data:{
                        senderId:currentUserId,
                        receiverId:userId
                    }
                });
            }
        }

    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
    }
};

export const switchBlock = async(userId:string)=>{
    const {userId: currentUserId} = auth();
    if(!currentUserId) {
        throw new Error("User is not authenticated");
    }
    try {
        const existingBlock = await prisma.blockRequest.findFirst({
            where:{
                senderId: currentUserId,
                receiverId: userId
            }
        });
        if(existingBlock){
            await prisma.blockRequest.delete({
                where:{
                    id: existingBlock.id
                }
            });
        }else{
            await prisma.blockRequest.create({
                data:{
                    senderId:currentUserId,
                    receiverId:userId
                }
            });
        }


    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
        
    }
};

export const acceptFollowRequest = async(senderId:string)=>{
    const {userId: currentUserId} = auth();
    if(!currentUserId) {
        throw new Error("User is not authenticated");
    }
    try {
        const existingFollowRequest = await prisma.followRequest.findFirst({
            where:{
                senderId,
                receiverId: currentUserId
            }
        });
        if(existingFollowRequest){
            await prisma.followRequest.delete({
                where:{
                    id: existingFollowRequest.id
                }
            });

            await prisma.follower.create({
                data:{
                    followerId: senderId,
                    followingId: currentUserId
                }
            });
        }

    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
    }
};

export const declineFollowRequest = async(senderId:string)=>{

    const {userId: currentUserId} = auth();
    if(!currentUserId) {
        throw new Error("User is not authenticated");
    }
    try {
        
        const existingFollowRequest = await prisma.followRequest.findFirst({
            where:{
                senderId,
                receiverId: currentUserId
            }
        });
        if(existingFollowRequest){
            await prisma.followRequest.delete({
                where:{
                    id: existingFollowRequest.id
                }
            });
        }

    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
    }
};

export type UpdateResult = {
    success:boolean;
    error:boolean;
};

export const updateProfile = async(formData:FormData, cover:string):Promise<UpdateResult>=>{

    const {userId:currentUserId} = auth();
    if(!currentUserId) {
        
        return {success:false, error:true};
    }

    const fields = Object.fromEntries(formData);
    
    // const filteredFields = Object.fromEntries(Object.entries(fields).filter(([_, value])=>value !== ""));
    const filteredFields = Object.fromEntries(Array.from(formData.entries()).filter(([_, value])=>value !== ""));
    

    const Profile = z.object({
        cover: z.string().optional(),
        name: z.string().max(60).optional(),
        surname: z.string().max(60).optional(),
        description: z.string().max(255).optional(),
        city: z.string().max(60).optional(),
        school: z.string().max(60).optional(),
        work: z.string().max(60).optional(),
        webset: z.string().max(60).optional(),
    });

    const validatedFields = Profile.safeParse({cover, ...filteredFields});
    if(!validatedFields.success){
        console.log(validatedFields.error.flatten().fieldErrors)
        // throw new Error("Invalid data");
        return {success:false, error:true};
    }

    try {
        await prisma.user.update({
            where:{
                id: currentUserId
            },
            data: validatedFields.data
        });
        return {success:true, error:false};
    } catch (error) {
        console.log(error);
        
        return {success:false, error:true};
    }
};


export const switchPostLike = async(postId:number)=>{

    const {userId} = auth();
    if(!userId) {
        throw new Error("User is not authenticated");
    }

    try {
        const existingLike = await prisma.postLike.findFirst({
            where:{
                userId,
                postId
            }
        });
        if(existingLike){
            await prisma.postLike.delete({
                where:{
                    id: existingLike.id
                }
            });
        }else{
            await prisma.postLike.create({
                data:{
                    userId,
                    postId
                }
            });
        }
    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
    }
};

export const addComment = async(postId:number, desc:string)=>{

    const {userId:currentUserId} = auth();
    if(!currentUserId) {
        throw new Error("User is not authenticated");
    }

    try {
        
        const createdComment = await prisma.comment.create({
            data:{
                userId:currentUserId,
                postId,
                desc
            },
            include:{
                user:true
            }
        });
        return createdComment;
    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
        
    }

};

export const addPost = async(formData:FormData, img:string)=>{
    const {userId:currentUserId} = auth();
    if(!currentUserId) {
        throw new Error("User is not authenticated");
    }

    const desc = formData.get("desc") as string;
    const validatedDesc = z.string().min(1).max(255).safeParse(desc);
    if(!validatedDesc.success){
        console.log("Invalid desc");
        return;
    }

    try {
        await prisma.post.create({
            data:{
                userId:currentUserId,
                desc:validatedDesc.data,
                img
            }
        });
        
        revalidatePath("/");

    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
    }

};

export const addStory = async(img:string)=>{
    const {userId:currentUserId} = auth();
    if(!currentUserId) {
        throw new Error("User is not authenticated");
    }

    try {

        const existingStory = await prisma.story.findFirst({
            where:{
                userId:currentUserId,
                expiresAt:{
                    gt: new Date()
                }
            },
            include:{
                user:true
            }
        });
        if(existingStory){
            await prisma.story.delete({
                where:{
                    id: existingStory.id
                }
            });
        }

        const createdStory = await prisma.story.create({
            data:{
                userId:currentUserId,
                img,
                expiresAt: new Date(Date.now() + 24*60*60*1000)
            },
            include:{
                user:true
            }
        });
        return createdStory
    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
    }
};

export const deletePost = async(postId:number)=>{
    const {userId:currentUserId} = auth();
    if(!currentUserId) {
        throw new Error("User is not authenticated");
    }

    try {
        await prisma.post.delete({
            where:{
                id:postId,
                userId:currentUserId
            }
        });
        revalidatePath("/");
    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
    }
};


