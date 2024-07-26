import {PrismaAdapter} from "@next-auth/prisma-adapter"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcryptjs from "bcryptjs"
import db from "Qui/lib/db"

export const authQptions = {
    adapter: PrismaAdapter(db),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {label:"email", type:"text"},
                password: {label:"password", type:"password"}
            },
            async authorize(credentials){
                const {email, password} = credentials
                const user = await db.user.findUnique({where:{email}})
                if(!user)
                {
                    throw new Error("Invalid Input")
                }
                const isCorrectPass = await bcryptjs.compare(password, user.password)
                if(!isCorrectPass)
                {
                    throw new Error("Invalid Input")
                }
                else
                {
                    const {password, ...currentUser} = user
                    return currentUser
                }
            }
        })
    ],
    session:{
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    },
    callbacks: {
        jwt({token, user})
        {
            if(user) token.isAdmin = user.isAdmin
            return token
        }
    },
    session({session, token}){
        session.user.isAdmin = token.isAdmin
        return session
    }
}

const handler = NextAuth(authQptions)
export {handler as GET, handler as POST}