import db from "Qui/lib/db";
import { getCurrentUser } from "Qui/lib/currentUser";
import { NextResponse } from "next/server";
import { getDatesInRange } from "Qui/lib/dateToMilliseconds"

export async function GET(req) {
    try {
        const currentUser = await getCurrentUser()

        if (currentUser.isAdmin) {
            const allReservations = await db.reservations.findMany({
                include: {
                    listing: true
                }
            })

            return NextResponse.json(allReservations)
        } else {
            const userReservations = await db.reservations.findMany({
                where: {
                    userId: currentUser.id
                },
                include: {
                    listing: true
                }
            })

            return NextResponse.json(userReservations)
        }

    } catch (error) {
        return NextResponse.json(error)
    }
}

export async function POST(req) {
    try {
        const currentUser = await getCurrentUser()
        const body = await req.json()

        const {
            startDate,
            endDate,
            listingId,
            daysDifference
        } = body

        const listing = await db.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                reservations: true
            }
        })

        const allBookedDates = listing.reservations.flatMap((reservation) => {
            const reservedDates = reservation.reservedDates

            return reservedDates
        })

        const getDates = getDatesInRange(startDate, endDate)
        const isUnavailable = allBookedDates.some((date) => getDates.includes(date))

        if(isUnavailable){
            return NextResponse.error({
                message: "You are trying to reserve a booked date!"
            })
        }

        const newReservation = await db.reservations.create({
            data: {
                startDate,
                endDate,
                listingId,
                daysDifference,
                reservedDates: getDates,
                userId: currentUser.id
            }
        })

        return NextResponse.json(newReservation)
    } catch (error) {
        return NextResponse.json(error)
    }
}