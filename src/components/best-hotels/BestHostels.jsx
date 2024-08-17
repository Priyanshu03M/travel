import React from 'react'
import image_1 from '../../../public/images/paris.jpg'
import image_2 from '../../../public/images/Mumbai.jpg'
import image_3 from '../../../public/images/AbuDhabi.jpg'
import image_4 from '../../../public/images/berlin.jpg'
import image_5 from '../../../public/images/hamburg.jpg'
import Card from './Card'

const BestHostels = () => {
  const data = [
    {
      id: 1,
      name: "Arabian Paradise",
      image: image_1,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
    {
      id: 2,
      name: "Arabian Paradise",
      image: image_2,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
    {
      id: 3,
      name: "Arabian Paradise",
      image: image_3,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
    {
      id: 4,
      name: "Arabian Paradise",
      image: image_4,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
    {
      id: 5,
      name: "Arabian Paradise",
      image: image_5,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
  ]
  return (
    <div className="h-full w-full my-36">
      <div className='h-full w-5/6 mx-auto flex flex-col justify-start'>
        <h2 className='text-4xl text-slzte-800 font-bold mt-6 mb-12'>
          Best hotels
        </h2>
        <div className='flex flex-wrap items-center gap-14'>
          {data?.map((place, idx)=>(
            <Card
              key={idx}
              place={place}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BestHostels