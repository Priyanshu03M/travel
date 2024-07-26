"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import Footer from '../footer/footer'
import Navbar from '../navbar/navbar'

const Layout = ({children}) => {
    const pathname = usePathname()

  return (
    <div>
        {pathname !== "/login" && pathname !== "/signup" && <Navbar/>}
        {children}
        {pathname !== "/login" && pathname !== "/signup" && <Footer/>}
    </div>
  )
}

export default Layout