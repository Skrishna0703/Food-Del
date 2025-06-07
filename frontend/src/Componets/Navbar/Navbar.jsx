import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets.js'
import { useContext ,useState } from 'react'
import {Link} from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

export const Navbar = ({setShowLogin}) => {

    const [Menu,setMenu] = useState("Menu")
    const {getTotalCartAmount} = useContext(StoreContext);
  return (
    <div className='navbar'>
       <Link t='/' ><img src={assets.logo} alt="" className="logo" /></Link>
       <ul className="navbar-menu">
  <Link to='/' onClick={() => setMenu("Home")} className={Menu === "Home" ? "active" : ""}>Home</Link>
  <a  href='#explore-menu' onClick={() => setMenu("Menu")} className={Menu === "Menu" ? "active" : ""}>Menu</a>
  <a href='#app-download' onClick={() => setMenu("Mobile-App")} className={Menu === "Mobile-App" ? "active" : ""}>Mobile-App</a>
  <a href='#footer' onClick={() => setMenu("Contact")} className={Menu === "Contact" ? "active" : ""}>Contact</a>
</ul>

       <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
       <div className="navbar-search-icon">
        
        <div className={getTotalCartAmount()===0?"":"dot"}>
        </div>
        <button onClick={()=>setShowLogin(true)}>Sign in</button>
       </div>
       </div>
        </div>
  )
}
export default Navbar