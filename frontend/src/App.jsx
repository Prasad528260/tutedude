import React from 'react'
import AuthPage from './components/auth/AuthPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Body from './components/layout/Body'
import Orders from './components/Orders/Orders'
import NearbyVendorsScreen from './components/NearbyVendorsScreeen/NearbyVendorsScreen.jsx'
import './App.css'
import Products from './components/products/Products'
import ProductDetails from './components/products/ProductDetails'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/body" element={<Body />} >
        <Route path="/body/orders" element={<Orders />} />
        <Route path="/body/nearby-vendors" element={<NearbyVendorsScreen />} />
        <Route path="/body/products" element={<Products />} />
        <Route path="/body/products/:id" element={<ProductDetails />} />
  
        </Route>
      </Routes>
    </Router>
  )
}

export default App
