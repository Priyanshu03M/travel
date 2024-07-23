"use client"
import {Card, CardBody, CardFooter, Image} from '@nextui-org/card'
import React from 'react'
import CityCard from './CityCard'

const PopularCity = () => {
    const list = [
        {
            city: "Mumbai",
            image: "/images/Mumbai.jpg",
        },
        {
            city: "Abu Dhabi",
            image: "/images/AbuDhabi.jpg",
        },
    ]
  return (
    <>
        {list.map((city, index) =>(
            <div style={styles.container}>
                <CityCard imageUrl={city.image} placeName={city.city}/>
            </div>
        ))}
    </>
  )
}

const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexWrap: 'wrap', // Ensures the cards wrap to the next line if needed
    },
  };

export default PopularCity