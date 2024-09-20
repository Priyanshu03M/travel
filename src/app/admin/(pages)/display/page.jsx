'use client'
import React, { useState, useEffect } from 'react'
import { MdEditDocument } from "react-icons/md";
import Link from 'next/link';
import Removebtn from '../../components/Removebtn';
import HomeIcon from '../../components/home';
import { useRouter } from 'next/navigation';

function Card({ guide , onClick}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div onClick={onClick} className="border rounded-lg overflow-hidden shadow-lg bg-white cursor-pointer">
            {/* Image */}
            <img src={guide.image} alt={guide.title} className="w-full h-48 object-cover" />

            {/* Content */}
            <div className="p-4">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{guide.title}</h3>
                <p className="text-gray-700">{guide.description}</p>
            </div>

            {/* Dropdown Toggle */}
            <div className="p-4">
                <button
                    onClick={toggleDropdown}
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                >
                    {isDropdownOpen ? 'Hide Details' : 'Show Details'}
                </button>
            </div>

            {/* Dropdown Content */}
            {isDropdownOpen && (
                <div className="p-4 bg-gray-100">
                    <p className="text-gray-700"><strong>City:</strong> {guide.city}</p>
                    <p className="text-gray-700"><strong>Price:</strong> ${guide.price}</p>
                    <p className="text-gray-700"><strong>Max Group Size:</strong> {guide.maxGroupSize}</p>
                </div>
            )}

            {/* Buttons */}
            <div className="flex justify-between p-4 bg-gray-100">
                <Removebtn id={guide._id} />
                <Link href={`/admin/editGuide/${guide._id}`}>
                    <button className="text-blue-500 hover:text-blue-700">
                        <MdEditDocument size={24} />
                    </button>
                </Link>
            </div>
        </div>
    );
}

const getGuides = async () => {
    try {
        const res = await fetch(`${process.env.API_BASE_URL}/api/users/guides`, { cache: 'no-store' });
        if (!res.ok) {
            toast.error("Guides not fetched");
            return { book: [] };  // Return an object with an empty book array
        }
        const data = await res.json();
        return data;  // Ensure this returns the fetched data
    } catch (error) {
        console.error("Error fetching guides:", error);
        return { book: [] };  // Return an object with an empty book array
    }
};

export default function DisplayPage() {
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const handleCardClick = (guide) => {
        router.push(`/admin/guideDetails/${guide._id}`);
    };
    useEffect(() => {
        const fetchGuides = async () => {
            try {
                const data = await getGuides();
                console.log("Fetched data:", data);  // Log the fetched data
                if (Array.isArray(data.book)) {
                    setGuides(data.book);  // Update state with the book array
                } else {
                    console.error("Data.book is not an array:", data);
                }
            } catch (error) {
                console.error("Error setting guides:", error);
            } finally {
                setLoading(false);  // Stop loading spinner
            }
        };

        fetchGuides();
    }, []);  // Empty dependency array ensures this runs only once when the component mounts

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="absolute top-6 left-6">
                <HomeIcon />
            </div>
            <div className="text-center mt-12">
                <h1 className="text-4xl font-bold mb-6">Display Page</h1>
                <p className="text-gray-600 mb-8">Here you can view the existing entries.</p>

                {/* Grid for displaying guides */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
                    {guides.map((guide) => (
                        <Card key={guide._id} guide={guide} onClick={() => handleCardClick(guide)}/>
                    ))}
                </div>
            </div>
        </div>
    );
}