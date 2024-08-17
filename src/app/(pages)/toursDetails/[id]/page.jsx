'use client'
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
// import details from 'Qui/data/guides';
import reviewsDetails from 'Qui/data/review';

const getGuides = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/users/guides', { cache: 'no-store' });
    if (!res.ok) {
      toast.error("Guides not fetched");
      return { book: [] };
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching guides:", error);
    return { book: [] };
  }
};

const Tours = (props) => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const router = useRouter();
  const {id} = props.params;
  
  
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
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  

  useEffect(() => {
    const detail = guides.find(item => item._id === props.params._id);
    if (detail) {
      setTotalPrice(detail.price);
    }
  }, [guides, props.params._id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const detail = guides.find(item => item._id === props.params._id);

  if (!detail) {
    return <div>Detail not found</div>;
  }

  const sortedReviews = reviewsDetails.sort((a, b) => new Date(b.date) - new Date(a.date));

  const { image, title, description, price, reviews, city, maxGroupSize } = detail;

  const handleGuestsChange = (e) => {
    const guestCount = parseInt(e.target.value, 10);
    setGuests(guestCount);
    setTotalPrice(guestCount * detail.price);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const booking = {
      name,
      email,
      date,
      guests,
      totalPrice
    };
    try {
      const response = await axios.post("/api/users/booking", booking);
      toast.success("Booking Successfull");
      router.push('/');
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div>
      <section>
        <Container>
          <Row>
            <Col className="lg:m-8 lg:p-8">
              <div>
                <div className="flex flex-wrap">
                  {/* Left Column: Content */}
                  <div className="w-full lg:w-1/2 mb-10">
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
                  </div>

                  {/* Right Column: Booking Form */}
                  <div className="w-full lg:w-1/2 lg:pl-10">
                    <div className="rounded-md p-8 border border-[#F6E4E4]">
                      <h2 className="text-xl mb-6">Book Your Tour</h2>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label className="block text-base font-medium mb-2" htmlFor="name">Full Name</label>
                          <input
                            className="w-full p-3 border border-gray-300 rounded-md"
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-base font-medium mb-2" htmlFor="email">Email</label>
                          <input
                            className="w-full p-3 border border-gray-300 rounded-md"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-base font-medium mb-2" htmlFor="date">Date</label>
                          <input
                            className="w-full p-3 border border-gray-300 rounded-md"
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-base font-medium mb-2" htmlFor="guests">Number of Guests</label>
                          <input
                            className="w-full p-3 border border-gray-300 rounded-md"
                            type="number"
                            id="guests"
                            value={guests}
                            onChange={handleGuestsChange}
                            min="1"
                            placeholder="Enter number of guests"
                            required
                          />
                        </div>
                        <div className="mb-6 text-lg font-semibold">
                          Total Price: ${totalPrice}
                        </div>
                        <button
                          className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                          type="submit"
                        >
                          Book Now
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="rounded-md p-8 border border-[#F6E4E4]">
                  <h4 className="mb-12">Reviews ({reviews?.length} reviews)</h4>
                  <form>
                    <div className="flex items-center gap-5 mb-4 text-base cursor-pointer">
                      <span className="flex items-center gap-1 mb-4 text-base cursor-pointer">1<FaStar className="text-yellow-500" /></span>
                      <span className="flex items-center gap-1 mb-4 text-base cursor-pointer">2<FaStar className="text-yellow-500" /></span>
                      <span className="flex items-center gap-1 mb-4 text-base cursor-pointer">3<FaStar className="text-yellow-500" /></span>
                      <span className="flex items-center gap-1 mb-4 text-base cursor-pointer">4<FaStar className="text-yellow-500" /></span>
                      <span className="flex items-center gap-1 mb-4 text-base cursor-pointer">5<FaStar className="text-yellow-500" /></span>
                    </div>
                    <div className="flex space-x-4 w-1/2">
                      <input
                        type="text"
                        placeholder="Share your thoughts"
                        className="flex-1 py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="submit"
                        className="py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Submit
                      </button>
                    </div>
                  </form>

                </div>
                <div className="rounded-md p-8 border border-[#F6E4E4]">
                  <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
                  <div className="space-y-4">
                    {sortedReviews.map(review => (
                      <div key={review.id} className="p-4 border border-gray-300 rounded-lg">
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
                    ))}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Tours;
