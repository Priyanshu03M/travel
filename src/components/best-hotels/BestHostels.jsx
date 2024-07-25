import React from 'react'
import image_1 from '../../../public/images/Mumbai.jpg'
import Card from './Card'

const BestHostels = () => {
  const data = [
    {
      name: "Arabian Paradise",
      image: image_1,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
    {
      name: "Arabian Paradise",
      image: image_1,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
    {
      name: "Arabian Paradise",
      image: image_1,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
    {
      name: "Arabian Paradise",
      image: image_1,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
    {
      name: "Arabian Paradise",
      image: image_1,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
  ]
  return (
    <div className="h-full w-full my-36">
      <div className='h-full w-5/6 mx-auto flex flex-col justify-start'>
        <h5 className='text-[20px] bg-blue-500 text-white rounded-full p-4 w-max'>
          Explore Top
        </h5>
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