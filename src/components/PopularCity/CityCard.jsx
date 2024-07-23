import React from 'react'
// components/Card.js

import Image from 'next/image';

const CityCard = ({ imageUrl, placeName }) => {
  return (
    <div style={styles.cardContainer}>
      <Image src={imageUrl} alt={placeName} layout="fill" objectFit="cover" style={styles.image}/>
      <div style={styles.textContainer}>
        <p style={styles.placeName}>{placeName}</p>
      </div>
    </div>
  );
};


const styles = {
    cardContainer: {
      position: 'relative',
      width: '300px',
      height: '200px',
      overflow: 'hidden',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      margin: '10px',
    },
    image: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    textContainer: {
      position: 'absolute',
      bottom: '10px',
      right: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '4px',
      padding: '4px 8px',
    },
    placeName: {
      color: 'white',
      margin: 0,
    },
  };

export default CityCard;
