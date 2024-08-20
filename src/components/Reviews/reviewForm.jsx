import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const ReviewForm = (props) => {

    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');
    const [rating, setRating] = useState(5);
    const [tourId, setTourId] = useState(props.id);
    const router = useRouter();

    const handleReviewSubmit = async (event) => {
        event.preventDefault();

        const reviewData = {
            tourId,
            author,
            text,
            rating,
        };

        const response = await fetch(`/api/users/reviews/${props.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        });

        const result = await response.json();
        router.refresh();
        if (result.success) {
        } else {
            // Handle error
        }
    };

    return (
        <div className="rounded-md p-8 border border-[#F6E4E4]">
            <h4 className="mb-12">Reviews</h4>
            <form onSubmit={handleReviewSubmit}>
                <div className="flex space-x-4 w-1/2">
                    <input
                        type="text"
                        value={author}
                        placeholder="Your Name"
                        onChange={(e) => setAuthor(e.target.value)}
                        className="flex-1 py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        value={text}
                        placeholder="Share your thoughts"
                        onChange={(e) => setText(e.target.value)}
                        className="flex-1 py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                        <option value={5}>5 - Excellent</option>
                        <option value={4}>4 - Good</option>
                        <option value={3}>3 - Average</option>
                        <option value={2}>2 - Poor</option>
                        <option value={1}>1 - Terrible</option>
                    </select>
                    <button
                        type="submit"
                        className="py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit
                    </button>
                </div>
            </form>

        </div>
    )
}

export default ReviewForm