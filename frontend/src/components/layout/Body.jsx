import React from 'react'
import { Outlet } from 'react-router-dom'
import '../../App.css'
import BottomNav from '../Orders/BottomNav'
const Body = () => {
  return (
    <>
      <div className="with-bottom-nav-padding">
        <Outlet />
      </div>
      <BottomNav />
    </>
  )
}

export default Body