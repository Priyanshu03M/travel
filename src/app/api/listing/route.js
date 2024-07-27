import { NextResponse } from "next/server";
import isAdminUser from "Qui/lib/isAdminUser";
import db from "Qui/lib/db";


export async function GET(req){
    try {
        const listings = await db.listing.findMany({
            take: 10
        })

        return NextResponse.json(listings)
    } catch (error) {
        return NextResponse.error(error)
    }
}

export async function POST(req)
{
    try 
    {
        await isAdminUser()
        const body = await register.json()
        Object.values(body).forEach((v)=>{
            if(v === "") return NextResponse.error({message: "Fill all fields"})
        })

        const {
            name, location, desx, type, pricePerNight, beds, hasFreeWifi, imageUrls
        } = body
        const newListing = await db.listing.create({
            data: {name, location, desx, type, pricePerNight, beds, hasFreeWifi, imageUrls}
        })
        return NextResponse.json(newListing)
    }
    catch (error)
    {
        return NextResponse.json(error)
    }
}