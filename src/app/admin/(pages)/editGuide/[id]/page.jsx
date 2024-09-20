'use client'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import HomeIcon from '../../../components/home'

const getGuideById = async (id) => {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/users/guides/${id}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error("Failed to fetch guide");
    }
    return res.json();
  } catch (error) {
    console.log("Error:", error);
  }
}

const EditGuide = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [newTitle, setTitle] = useState('');
  const [newCity, setCity] = useState('');
  const [newPrice, setPrice] = useState('');
  const [newMaxGroupSize, setMaxGroupSize] = useState('');
  const [newDescription, setDescription] = useState('');
  const [newImage, setImage] = useState('');

  useEffect(() => {
    const fetchGuide = async () => {
      const data = await getGuideById(id);
      if (data && data.guide) {
        const { title, city, price, maxGroupSize, description, image } = data.guide;
        setTitle(title);
        setCity(city);
        setPrice(price);
        setMaxGroupSize(maxGroupSize);
        setDescription(description);
        setImage(image);
      }
    };
    fetchGuide();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/admin/guides/${id}`, {
        cache: 'no-cache',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTitle,
          city: newCity,
          price: newPrice,
          maxGroupSize: newMaxGroupSize,
          description: newDescription,
          image: newImage,
        }),
      });

      if (res.ok) {
        alert('Guide updated successfully!');
        router.push("/admin/display")
      } else {
        alert('Failed to update guide');
      }
    } catch (error) {
      console.error('Error updating guide:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="absolute top-6 left-6">
                <HomeIcon />
            </div>

            <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-8">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Update Guide</h2>
                <form onSubmit={handleSubmit}>
                    {/* Title Input */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Title</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            value={newTitle}
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
                            value={newCity}
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
                            value={newPrice}
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
                            value={newMaxGroupSize}
                            onChange={(e) => setMaxGroupSize(e.target.value)}
                            required
                        />
                    </div>

                    {/* Description Textarea */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Description</label>
                        <textarea
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            value={newDescription}
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
                            value={newImage}
                            onChange={(e) => setImage(e.target.value)}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-transform transform hover:scale-105"
                    >
                        Update Guide
                    </button>
                </form>
            </div>
        </div>
  );
}

export default EditGuide;
