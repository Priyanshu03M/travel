import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { AiFillStar } from "react-icons/ai";
import { format } from 'currency-formatter';

const Card = ({place}) => {
  return (
    <Link href={"/details/1"} className='h-[450px] w-[250px] flex flex-col rounded-xl cursor-pointer transition-all shadow-md hover:shadow-lg'>
        <div className='relative h-2/3 w-full'>
            <Image
                src={place.image}
                className='h-full w-full rounded-tl-xl rounded-tr-xl object-cover'
                alt="Location's image"
            />
            <div className='absolute right-0 bottom-0 p-2 bg-blue-700 text-white rounded-tl-xl font-semibold'>
                {place.location}
            </div>
        </div>
        <div className='w-full flex flex-col gap-2 p-3'>
            <div className='flex justify-between items-center'>
                <h2 className='text-lg text-slate-800 font-semibold'>
                    {place.name}
                </h2>
                <span className='p-2 rounded-full bg-blue-600 text-white flex items-center gap-1'>
                    <AiFillStar color="white" size={"1.8em"}/>
                    <span className='text-white'>
                        {place.reviews}
                    </span>
                </span>
            </div>
            <div className='flex justify-between items-center'>
                <span className='text-md font-medium'>
                    {format(place.price, {locale:"en-IN"})}
                </span>
                <button className='py-1 px-4 bg-blue-500 text-white rounded-md'>
                    Book
                </button>
            </div>
        </div>
    </Link>

  )
}

export default Card