import { User } from "@prisma/client";

export const GetNameFromUser = (user:User)=>{
    return (user.name && user.surname)?`${user.name} ${user.surname}`:user.username;
};

