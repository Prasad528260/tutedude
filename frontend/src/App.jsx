import React from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import AuthPage from './components/auth/AuthPage'
import Landing from './components/Landing/Landing'
import Body from './components/layout/Body'
import NearbyVendorsScreen from './components/NearbyVendorsScreeen/NearbyVendorsScreen.jsx'
import Orders from './components/Orders/Orders'
import Products from './components/Products/Products'
import Profile from './components/profile/Profile'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/body" element={<Body />}>
          <Route index element={<Navigate to="/body/home" replace />} />
          <Route path="home" element={<Landing />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="nearby-vendors" element={<NearbyVendorsScreen />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
