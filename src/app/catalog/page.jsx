'use client'
import image_1 from '../../../public/images/Mumbai.jpg'
import Image from 'next/image'
import React from 'react'
import image from "../../../public/images/Mumbai.jpg"
import Select from 'Qui/ui/Select'
import Button from 'Qui/ui/Button'
import Input from 'Qui/ui/Input'
import { optionLocations , optionTypes} from 'Qui/data/data'
import Card from 'Qui/components/best-hotels/Card'

const Catalog = () => {
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
        <div className='min-screen w-full'>
            <div className='relative h-3/5 w-full'>
                <Image
                    src={image}
                    className='brightness-50 h-screen w-full object-cover'
                />
                <h3 className='absolute text-6xl capitalize font-semibold flex items-center justify-center bottom-0 left-0 right-0 top-0 text-white'>
                    Mumbai
                </h3>
            </div>
            <div className='relative z-20 -mt-12 h-full flex flex-col items-center'>
                <form className='border w-2/3 h-28 border-slate-500 px-4 py-12 rounded-xl flex items-center text-white bg-blue-600'>
                    <div className='flex flex-col items-center gap-1'>
                        <h3 className='ml-1 text-[#efefef] font-semibold'>City</h3>
                        <Select data={optionLocations} className="text-blue-800 p-2 rounded-xl ouline-none" />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <h3 className="ml-1 text-[#efefef] font-semibold">
                            Price
                        </h3>
                        <div className="flex items-center gap-2">
                            <Input
                                type="number"
                                placeholder="Min. price"
                                className="text-blue-800 p-2 rounded-xl outline-none"
                            />
                            <Input
                                type="number"
                                placeholder="Max. price"
                                className="text-blue-800 p-2 rounded-xl outline-none"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-1">
                        <h3 className="ml-1 text-[#efefef] font-semibold">
                            Type of hotel
                        </h3>
                        <Select
                            data={optionTypes}
                            className="text-blue-800 p-2 rounded-xl outline-none"
                        />
                    </div>
                    <Button
                        disabled={false}
                        label="Search"
                        className="mt-6 px-6 py-2 text-[20px] bg-white text-blue-600 rounded-xl transition-all hover:bg-[#efefef]"
                    />
                </form>
                <div className="w-full mt-36 flex flex-wrap justify-center items-center gap-14">
                    {data.map((place, idx) => (
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

export default Catalog