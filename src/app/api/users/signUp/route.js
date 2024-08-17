import {connect} from 'Qui/dbconfig/dbconfig'
import User from 'Qui/models/userModel'
import { NextRequest, NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'

connect()

export async function POST(request){
    try{
        const reqBody = await request.json();
        const {username, email, password} = reqBody
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error:"User already exists"},{status:400})
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = new User({username, email, password:hashedPassword})
        const savedUser = await newUser.save()
        const res = NextResponse.json({messgase:"User created"},{success: true})
        return res
    }
    catch(error)
    {
        const res = NextResponse.json({error: error.message}, {status: 500})
        return res
    }
}