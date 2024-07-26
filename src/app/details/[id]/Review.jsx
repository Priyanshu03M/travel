import React from 'react'
import person_image from "../../../../public/images/person_1.jpg"
import Image from 'next/image'
import { AiFillStar } from 'react-icons/ai'

const Review = () => {
  return (
    <div className='mt-16 flex flex-col gap-24 w-1/3'>
        <div className='w-full flex gap-4'>
            <div className='w-14 h-14'>
                <Image className="w-full h-full object-cover rounded-full" src={person_image}/>
            </div>
            <div>
                <h3 className='font-semibold text-[20px]'>Aniket</h3>
                <span className='text-slate-700'>2 minutes ago</span>
                <div className='mt-4 text-slate-800'>Best Hotel in Dubai</div>
            </div>
            <span className='ml-auto flex items-center gap-2'>5<AiFillStar size={22} color='rbg(59, 130, 246'/></span>
        </div>            
    </div>
  )
}

export default Review