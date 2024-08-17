'use client'
import React, { useState } from 'react';
import testimonials from 'Qui/data/testimonial'

const TravelTestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 3 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform ease-in-out duration-500"
          style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="w-1/3 flex-shrink-0 flex flex-col items-center p-6 bg-white shadow-lg rounded-lg"
            >
              <img
                src={testimonial.image}
                alt={testimonial.location}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-lg text-center italic mb-4">{testimonial.text}</p>
              <p className="text-center font-semibold">{testimonial.name}</p>
              <p className="text-center text-gray-500">{testimonial.location}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
      >
        &#10095;
      </button>
    </div>
  );
};

export default TravelTestimonialCarousel;

