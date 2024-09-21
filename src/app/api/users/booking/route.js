import { NextResponse } from 'next/server'
import {connect} from '../../../../dbconfig/dbconfig'
import Book from '../../../../models/bookModel'

connect()

export async function POST(request) {
    try
    {
        const reqBody = await request.json();
        const {...data} = reqBody;
        const newBooking = new Book({...data});
        const savedBooking = await newBooking.save();
        const res = NextResponse.json({message:"Booking Successfull"},{success: true})
        return res
    }
    catch(error)
    {
        console.error('Error:', error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

export async function GET() {
    await connect();
    const book = await Book.find();
    return NextResponse.json({book})
}

