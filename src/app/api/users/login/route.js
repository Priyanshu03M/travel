import { connect } from '../../../../dbconfig/dbconfig'
import User from '../../../../models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "User doesn't exists" }, { status: 400 })
        }
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({ error: "Password is Invalid" }, { status: 400 })
        }
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
        }
        const token = jwt.sign(tokenData, process.env.NEXT_PUBLIC_TOKEN_SECRET, { expiresIn: "1h" })

        const response = NextResponse.json({ error: "Success" }, { success: true })
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response

    }
    catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
export async function GET() {
    try {
        const users = await User.find();
        return NextResponse.json({users})
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}