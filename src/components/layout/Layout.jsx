"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import Footer from '../footer/footer'

const Layout = ({children}) => {
    const pathname = usePathname()

  return (
    <div>
        {pathname !== "/login" && pathname !== "/signup" && <navbar/>}
        {children}
        {pathname !== "/login" && pathname !== "/signup" && <Footer/>}
    </div>
  )
}

export default Layout