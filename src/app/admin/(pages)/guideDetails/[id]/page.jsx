// pages/guideDetails/[id].js
'use client'

import Review from "Qui/components/Reviews/review";
import { useEffect, useState } from "react";

const getGuides = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/users/guides', { cache: 'no-store' });
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

const getBookings = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/users/booking/', { cache: 'no-store' });
        if (!res.ok) {
            toast.error("Booking not fetched");
            return { book: [] };
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching Booking:", error);
        return { book: [] };
    }
}

const GuideDetails = (props) => {
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bookings, setBookings] = useState([]);
    const { id } = props.params;

    props.params._id = id;

    useEffect(() => {
        const fetchGuides = async () => {
            try {
                const data = await getGuides();
                // console.log("Fetched data:", data);
                if (Array.isArray(data.book)) {
                    setGuides(data.book);
                    // console.log("Guides array:", data.book);

                } else {
                    // console.error("Data.book is not an array:", data);
                }
            } catch (error) {
                // console.error("Error setting guides:", error);
            }
        };

        fetchGuides();
    }, []);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {

                const data = await getBookings(props);
                if (Array.isArray(data.book)) {
                    setBookings(data.book);
                }
            } catch (err) {
                console.error("Error fetching reviews:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookingDetails();
    }, [props]);

    if (loading) {
        return <div>Loading...</div>;
    }
    const detail = guides.find(item => item._id === props.params._id);
    const filteredbookings = bookings.filter(book => book.tourId === props.params._id);
    if (!detail) {
        return <div>Detail not found</div>;
    }
    const { image, title, description, price, city, maxGroupSize } = detail;
    // Fetch and display the guide details based on the ID

    return (
        <div className="w-full mb-10">
            <img className="w-full rounded-md mb-10" src={image} alt="" />
            <div className="rounded-md p-8 border border-[#F6E4E4]">
                <h2 className='text-xl mb-4'>{title}</h2>
                <div className='flex items-center gap-5 mb-4'>
                    <span className='tour_rating flex items-center gap-1'>
                        {/* Reviews Rating */}
                    </span>
                </div>
                <div className="flex gap-6 mb-10 mt-4 items-center">
                    <span className='flex items-center text-base gap-2'>{city}</span>
                    <span className='flex items-center text-base gap-2'>{price}</span>
                    <span className='flex items-center text-base gap-2'>{maxGroupSize}</span>
                </div>
                <h5 className='mb-4 text-base'>Descriptions</h5>
                <p className="text-base leading-relaxed">{description}</p>
            </div>
            <Review id={detail._id} />
            <div className="rounded-md p-8 border border-[#F6E4E4]">
                <h2 className="text-xl font-bold mb-4">Bookings</h2>
                <div className="grid grid-cols-1 gap-6">
                    {filteredbookings.length === 0 ? (
                        <p>No Booking available.</p>
                    ) : (
                        filteredbookings.map(booking => (
                            <div key={booking._id} className="p-6 bg-white border rounded-lg shadow-md">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold">{booking.name}</h3>
                                    <span className="text-sm text-gray-500">
                                        {new Date(booking.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-gray-700"><strong>Email:</strong> {booking.email}</p>
                                {/* <p className="text-gray-700"><strong>Tour ID:</strong> {booking.tourId}</p> */}
                                <p className="text-gray-700"><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                                <p className="text-gray-700"><strong>Guests:</strong> {booking.guests}</p>
                                <p className="text-gray-700"><strong>Total Price:</strong> ₹{booking.totalPrice}</p>
                            </div>
                        )))
                    }
                </div>
            </div>
        </div>
    );
};

export default GuideDetails;
