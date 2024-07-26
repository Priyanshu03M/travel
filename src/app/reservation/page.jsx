"use client"
import React from 'react'
import Card from "./Card"
import Mumbai from '../../../public/images/Mumbai.jpg'

const Reservations = () => {
    const data = [
        {
            id: crypto.randomUUID(),
            listId: 1,
            image: Mumbai,
            location: "Mumbai",
            name: "Arabian Paradise",
            startDate: new Date(),
            endDate: new Date(),
            daysDifference: 5,
            pricePerNight: 5000,
        },
    ]
  return (
    <div className="mt-24 px-16 min-h-screen w-full">
      <div className="h-full w-full flex flex-wrap gap-12">
        {data?.map((hotel) => (
          <Card
            key={hotel.id}
            hotel={hotel}
          />
        ))}
      </div>
    </div>
  )
}

export default Reservations