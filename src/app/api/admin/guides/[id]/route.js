import { NextResponse } from "next/server";
import { connect } from "../../../../../dbconfig/dbconfig";
import Guide from "../../../../../models/guidesModel";

connect()

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const { title, city, price, maxGroupSize, description, image } = await request.json();

        const updatedGuide = await Guide.findByIdAndUpdate(
            id,
            { title, city, price, maxGroupSize, description, image },
            { new: true }
        );

        if (!updatedGuide) {
            return NextResponse.json({ message: 'Guide not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Guide Updated', guide: updatedGuide }, { status: 200 });
    } catch (error) {
        console.error('Error updating guide:', error);
        return NextResponse.json({ message: 'Failed to update guide', error: error.message }, { status: 500 });
    }
}

export async function GET(request, { params }) {
    const { id } = params;
    const guide = await Guide.findOne({ _id: id });
    return NextResponse.json({ guide }, { status: 200 });
}
