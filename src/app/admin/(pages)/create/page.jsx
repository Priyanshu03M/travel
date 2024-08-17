'use client'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import HomeIcon from '../../components/home'

const Dashboard = () => {
    const router = useRouter()
    const [title, setTitle] = useState('');
    const [city, setCity] = useState('');
    const [price, setPrice] = useState('');
    const [maxGroupSize, setMaxGroupSize] = useState(1);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const guideData = {
            title,
            city,
            price: parseFloat(price),
            maxGroupSize: parseInt(maxGroupSize),
            description,
            image,
        };
        try {
            const response = await axios.post("/api/admin/guides", guideData);
            toast.success("Guide created Successfull");
            router.push('/admin/display');
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="absolute top-6 left-6">
                <HomeIcon />
            </div>

            <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-8">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add a New Guide</h2>
                <form onSubmit={handleSubmit}>
                    {/* Title Input */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Title</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    {/* City Input */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">City</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>

                    {/* Price Input */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Price (in cents)</label>
                        <input
                            type="number"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>

                    {/* Max Group Size Input */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Max Group Size</label>
                        <input
                            type="number"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            value={maxGroupSize}
                            onChange={(e) => setMaxGroupSize(e.target.value)}
                            required
                        />
                    </div>

                    {/* Description Textarea */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Description</label>
                        <textarea
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    {/* Image URL Input */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-transform transform hover:scale-105"
                    >
                        Add Guide
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Dashboard