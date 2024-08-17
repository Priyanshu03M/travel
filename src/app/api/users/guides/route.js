import { NextResponse } from 'next/server'
import { connect } from 'Qui/dbconfig/dbconfig'
import Guide from 'Qui/models/guidesModel'


connect()

export async function GET() {
    const book = await Guide.find();
    return NextResponse.json({book})
}