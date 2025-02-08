import React from 'react'
import { Navbar } from './Componets/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import { Home } from './Pages/Home/Home'
import { Cart } from './Pages/Cart/Cart'
import { PlaceOrder } from './Pages/PlaceOrder/PlaceOrder'


export const App = () => {
  return (
    <div className='app'>
      <Navbar/>
     
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/placeorder' element={<PlaceOrder/>} />
        
      </Routes>
    </div>
  )
}
export default App