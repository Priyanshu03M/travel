import db from "./db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authQptions } from "Qui/app/api/auth/[...nextauth]/route";

export async function getSession()
{
    return await getServerSession(authQptions)
}

export async function getCurrentUser()
{
    try
    {
        const session = await getSession()
        if(!session?.user?.email) return null
        const user = await db.user.findUnique({where:{email: session.user.email}})
        if(!user) return null
        const {password, ...currentUser} = user
        return currentUser
    }
    catch (error)
    {
        console.log(error);
    }
}