import { NextResponse } from 'next/server'
import { connect } from '../../../../dbconfig/dbconfig'
import Guide from '../../../../models/guidesModel'
import cloudinary from 'Qui/utils/cloudinary'

connect()

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { title, city, price, maxGroupSize, description, imageUrl } = reqBody; // imageUrl is passed here

        // Create a new guide with the uploaded image URL
        const newGuide = new Guide({
            title,
            city,
            price,
            maxGroupSize,
            description,
            image: imageUrl // Use the uploaded image URL
        });

        const savedGuide = await newGuide.save();

        // Send success response
        return NextResponse.json({ message: "Guide created successfully", success: true, guide: savedGuide });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    const book = await Guide.find();
    return NextResponse.json({book})
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await Guide.findByIdAndDelete(id)
    return NextResponse.json({message: "Guide deleted"}, {status:200});
}