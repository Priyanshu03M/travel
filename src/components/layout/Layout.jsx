"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import Footer from '../footer/footer'
import Navbar from '../navbar/navbar'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Layout = ({children}) => {
    const pathname = usePathname()
    const queryClient = new QueryClient()

  return (
    <div>
        <QueryClientProvider client={queryClient}>
          {pathname !== "/login" && pathname !== "/signup" && <Navbar/>}
          {children}
          {pathname !== "/login" && pathname !== "/signup" && <Footer/>}
        </QueryClientProvider>
    </div>
  )
}

export default Layout