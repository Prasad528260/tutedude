import React from 'react'
import { Outlet } from 'react-router-dom'
import BottomNav from '../Orders/BottomNav'
import '../../App.css'
const Body = () => {
  return (
    <>
    <Outlet />
    <BottomNav />
    </>
  )
}

export default Body