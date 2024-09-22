import React, { useEffect, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const getReviews = async (tourId) => {
    try {
        const res = await fetch(`/api/users/reviews/${tourId}`, { cache: 'no-store' });
        if (!res.ok) {
            toast.error("Reviews not fetched");
            return { review: [] };
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return { review: [] };
    }
};

const Review = (props) => {

    const [reviews, setReviews] = useState([]);
    // console.log("TourId, ", props.id);

    useEffect(() => {
        const fetchReviewsDetails = async () => {
            try {

                const data = await getReviews(props);
                if (Array.isArray(data.review)) {
                    setReviews(data.review);
                }
            } catch (err) {
                console.error("Error fetching reviews:", err);
            }
        };

        fetchReviewsDetails();
    }, [props]);

    const filteredReviews = reviews.filter(review => review.tourId === props.id);
    const sortedReviews = filteredReviews.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="rounded-md p-8 border border-[#F6E4E4]">
            <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
            <div className="space-y-4">
                {sortedReviews.length === 0 ? (
                    <p>No reviews available.</p>
                ) : (
                    sortedReviews.map(review => (
                        <div key={review._id} className="p-4 border border-gray-300 rounded-lg">
                            <div className="flex items-center justify-between">
                                <p className="text-gray-700">
                                    <strong>{review.author}</strong> - <em>{new Date(review.date).toLocaleDateString()}</em>
                                </p>
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        i < review.rating ? <FaStar key={i} className="text-yellow-500" /> : <FaRegStar key={i} className="text-yellow-500" />
                                    ))}
                                </div>
                            </div>
                            <p>{review.text}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Review;
