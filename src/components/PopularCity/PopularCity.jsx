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
      <div style={styles.container}>
        {list.map((city, index) =>(
                <CityCard imageUrl={city.image} placeName={city.city}/>
              ))}
      </div>
    </>
  )
}

const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '70vh',
      flexWrap: 'wrap',
    },
  };

export default PopularCity