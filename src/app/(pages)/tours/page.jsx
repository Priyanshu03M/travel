'use client'
import Link from 'next/link';
import Footer from 'Qui/components/footer';
import Navbar from 'Qui/components/Navbar';
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';

const getGuides = async () => {
  try {
    const res = await fetch(`/api/users/guides`, { cache: 'no-store' });
    if (!res.ok) {
      toast.error("Guides not fetched");
      console.log(process.env.API_BASE_URL);
      return { book: [] };  // Return an object with an empty book array
    }
    const data = await res.json();
    return data;  // Ensure this returns the fetched data
  } catch (error) {
    console.error("Error fetching guides:", error);
    return { book: [] };  // Return an object with an empty book array
  }
};

const Tours = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

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

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredGuides = guides.filter(destination =>
    destination.city.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div>
      <Navbar />
      <div className="p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Explore travel guides and itineraries</h1>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search for a destination"
            className="border p-2 w-64 rounded-md"
          />
          <div className="mt-4">
            <button className="bg-gray-200 py-2 px-4 rounded-full mr-2">Japan</button>
            <button className="bg-gray-200 py-2 px-4 rounded-full mr-2">Oahu</button>
            <button className="bg-gray-200 py-2 px-4 rounded-full">See more...</button>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">Recent guides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredGuides.map((guide) => (
            <div key={guide._id} className="border rounded-lg overflow-hidden shadow-lg">
              <Link href={`/toursDetails/${guide._id}`}>
                <img src={guide.image} alt={guide.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
                  <p className="text-gray-700">{guide.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>

  )
}

export default Tours