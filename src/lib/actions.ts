"use server"

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";

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
        
        const existingFollowRequest = prisma.followRequest.findFirst({
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
