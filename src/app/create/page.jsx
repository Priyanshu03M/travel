'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from 'Qui/ui/Input'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { schema } from './schema'
import Select from 'Qui/ui/Select'
import { optionLocations, optionTypes } from 'Qui/data/data'
import toast from 'react-hot-toast'
import { createNewListing, postImages } from './api'
import { useMutation } from '@tanstack/react-query'
import Button from 'Qui/ui/Button'
import { useRouter } from 'next/router'


const Create = () => {
    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET
    const [images, setImages] = useState([])
    const router = useRouter

    const { mutateAsync, isLoading } = useMutation({
        mutationFn: ({ data, imageUrls }) => createNewListing(data, imageUrls),
        mutationKey: ["listings"]
    })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            desc: "",
            beds: 5,
            hasFreeWifi: false,
            type: "luxury",
            location: "dubai",
            pricePerNight: 123
        }
    })

    useEffect(() => {
        if (Object.keys((errors)).length > 0) {
            Object.keys((errors)).map((key) => {
                toast.error(errors[key].message)
            })
        }
    }, [errors])

    const handleImage = (e) => {
        setImages((prev) => {
            return [...prev, e.target.files[0]]
        })
    }

    const uploadImage = async (image, idx) => {
        if (!image) return

        const toastId = toast.loading(`Image ${idx + 1} is being uploaded`)

        const formData = new FormData()
        formData.append("file", image)
        formData.append("upload_preset", UPLOAD_PRESET)
        try {
            const imageUrl = await postImages(CLOUD_NAME, formData)
            toast.success(`Successfully uploaded image ${idx + 1}`)
            toast.dismiss(toastId)

            return imageUrl
        } catch (error) {
            console.error(error)
        }
    }
    const onSubmit = async (data) => {
        if (!images?.length) return toast.error("You must publish an image!")

        const imageUrls = await Promise.all(images.map((image, idx) => {
            const imageUrl = uploadImage(image, idx)
            return imageUrl
        }))

        const newListing = await mutateAsync({ data, imageUrls })
        toast.success("Redirecting to listing...")
        router.push(`/details/${newListing.id}`)
    }
    return (
        <div className='min-h-[950px] w-full flex justify-center items-center'>
            <div className='h-2/5 w-1/5 rounded-xl border border-slate-300'>
                <div className='p-3 w-full border-b border-slate-300'>
                    <h3 className='text-center font-semibold text-2xl'>
                        Create a listing
                    </h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full px-4 py-6 flex flex-col items-center gap-8'>
                    <Input className="text-slate-400 w-2/3 outline-none p-2" type="text" register={register("name")} placeholder="Arabian" />
                    <Input className="text-slate-400 w-2/3 outline-none p-2" type="text" register={register("desc")} placeholder="good Hotel"/>
                    <Select className="text-slate-400 w-2/3 outline-none p-2" data={optionLocations} register={register("location")} />
                    <Select className="text-slate-400 w-2/3 outline-none p-2" data={optionTypes} register={register("type")} />
                    <Input className="text-slate-400 w-2/3 outline-none p-2" type="number" register={register("pricePerNight", { valueAsNumber: true })} step={0.01} placeholder="7000" />
                    <Input className="text-slate-400 w-2/3 outline-none p-2" type="number" register={register("pricePerNight", { valueAsNumber: true })} step={1} />
                    <div className='text-slate-400 ml-4 w-2/3 flex items-center gap-4'>
                        <label htmlFor="freeWifif">Free Wifi</label>
                        <Input register={register("hasFreeWifi")} type="checkbox" id="freeWifi" className="w-4 h-4" />
                    </div>
                    <label className="text-slate-400 w-2/3 ml-4" htmlFor='images'>Upload Images</label>
                    <input
                        onChange={handleImage}
                        type="file"
                        className="text-slate-400"
                        style={{ display: "none" }}
                        id="images"
                    />
                    <Button
                        disabled={isLoading}
                        className="w-[400px] bg-blue-500 text-white px-4 py-2 rounded-xl disabled:bg-blue-700"
                        label="Submit"
                    />
                </form>
            </div>
        </div>
    )
}

export default Create