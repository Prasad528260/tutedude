import React from 'react'
import { Outlet } from 'react-router-dom'
import BottomNav from '../Orders/BottomNav'
const Body = () => {
  return (
    <>
    <Outlet />
    <BottomNav />
    </>
  )
}

export default Body