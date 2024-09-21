import { NextResponse } from 'next/server'
import {connect} from '../../../../../dbconfig/dbconfig'
import Review from '../../../../../models/reviewModel';

connect()

export async function POST(request) {
    try
    {
        const reqBody = await request.json();
        const {...data} = reqBody;
        const newReview = new Review({...data});
        const savedReview = await newReview.save();
        const res = NextResponse.json({message:"Review Successfull"},{success: true})
        return res;
    }
    catch(error)
    {
        console.error('Error:', error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

export async function GET() {
    await connect();
    const review = await Review.find();
    return NextResponse.json({review})
}

