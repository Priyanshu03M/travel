import { NextResponse } from 'next/server'
import { connect } from '../../../../dbconfig/dbconfig'
import Guide from '../../../../models/guidesModel'


connect()

export async function GET() {
    const book = await Guide.find();
    return NextResponse.json({book})
}