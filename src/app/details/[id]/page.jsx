"use client"
import Image from 'next/image'
import React, { useEffect, useState, useRef } from 'react'
import hotel_image_1 from "../../../../public/images/hr_1.jpg"
import hotel_image_2 from "../../../../public/images/hr_2.jpg"
import {register} from "swiper/element/bundle"
import { AiFillStar } from 'react-icons/ai'
import {CiLocationOn} from 'react-icons/ci'
import {FaBed, FaWifi} from "react-icons/fa"
import { format } from 'currency-formatter'
import Review from './Review'
import BookModel from 'Qui/components/book-modal/BookModel'

register()

const HotelDetails = (ctx) => {
    const id = ctx.params.id
    const [selectedStar, setSelectedStar] = useState(5)
    const [showModel, setShowModel] = useState(false)
    const swiperElRef = useRef(null)

    const handleShowModel = () => setShowModel(prev => true)
    const handleHideModel = () => setShowModel(prev => false)

  return (
    <div className={`min-h-screen w-full mt-24 ${showModel && "overflow-hidden"}`}>
        {showModel && <BookModel handleHideModel={handleHideModel}/>}
        <div className='h-full w-3/4 mx-auto'>
            <div>
                <div className='w-full h-[750px] overflow-hidden mx-auto'>
                    <div className='w-full h-full'>
                        <swiper-container
                            ref={swiperElRef}
                            slides-per-view="1"
                            navigations="true"
                        >
                            <swiper-slide>
                                <Image src={hotel_image_1} className='h-[750px] w-full object-cover'/>
                            </swiper-slide>
                            <swiper-slide>
                                <Image src={hotel_image_2} className='h-[750px] w-full object-cover'/>
                            </swiper-slide>
                        </swiper-container>
                    </div>
                </div>
                
                <div className='mt-12 px-6 w-full flex items-center justify-between'>
                    <h2 className='font-bold text-4xl'>Arabian Paradise</h2>
                    <div>
                        <span className='p-2 px-4 text-[22px] rounded-full bg-blue-600 text-white flex items-center'>
                            <AiFillStar color='white' size={"2em"}/>
                            <span className='text-white'>4.7</span>
                        </span>
                    </div>
                </div>
                
                <div className='mt-16 px-6 flex items-center gap-8'>
                    <span className='flex items-center gap-2'>
                        <CiLocationOn size={"2em"}/>
                        Dubai, UAE
                    </span>
                    <span className='flex items-center gap-2'>{format(249999.99,{locale: "en-IN"})}</span>
                    <span className='flex items-center gap-2'>2<FaBed size={"2em"}/></span>
                    <span className='flex items-center gap-2'>Free <FaWifi size={"2em"}/></span>
                </div>
                
                <div className='mt-16 px-6 w-full flex items-end justify-between'>
                    <p className='text-xl max-w-xl text-slate-700'>
                        Hello World
                    </p>
                    <button onClick={handleShowModel} className='cursor-pointer rounded-lg py-2 py-2 px-6 text-xl text-white bg-blue-500'>
                        Book
                    </button>
                </div>
            </div>
            
            <div className='border-t-2 border-white-800 px-6 mt-16 mx-auto'>
                
                <h1 className='mt-16 text-3xl font-bold'>
                    Reviews
                </h1>
                
                <div className='mt-8 flex items-center gap-6'>
                    {Array.from(Array(5).keys()).map((number)=>(
                        <span onClick={()=>setSelectedStar(number+1)} className={`${selectedStar === number+1 ? "scale-125" : ''} cursor-pointer flex items-center gap-2 transiton-all`}>
                            {number+1}
                            <AiFillStar size={22} color='rgb(59, 130, 246'/>
                        </span>
                    ))}
                </div>

            </div>

            <div className='mt-8 flex items-center gap-28 border rounded-lg py-4 px-6 w-max'>
                <input type="text" placeholder='Leave your opinion...'/>
                <button className='cursor-pointer rounded-lg py-2 px-6 text-xl text-white bg-blue-500 hover:bg-blue-400 transition-all'>Post</button>
            </div>

            <Review/>
            <Review/>
            <Review/>
            <Review/>

        </div>
    </div>
  )
}

export default HotelDetails