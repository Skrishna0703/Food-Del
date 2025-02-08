import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets.js'
import { useState } from 'react'

export const Navbar = () => {

    const [Menu,setMenu] = useState("Menu")
  return (
    <div className='navbar'>
       <img src={assets.logo} alt="" className="logo" />
       <ul className="navbar-menu">
  <li onClick={() => setMenu("Home")} className={Menu === "Home" ? "active" : ""}>Home</li>
  <li onClick={() => setMenu("Menu")} className={Menu === "Menu" ? "active" : ""}>Menu</li>
  <li onClick={() => setMenu("Mobile-App")} className={Menu === "Mobile-App" ? "active" : ""}>Mobile-App</li>
  <li onClick={() => setMenu("Contact")} className={Menu === "Contact" ? "active" : ""}>Contact</li>
</ul>

       <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <img src={assets.basket_icon} alt="" />
       <div className="navbar-search-icon">
        
        <div className="dot">
        </div>
        <button>Sign in</button>
       </div>
       </div>
        </div>
  )
}
export default Navbar