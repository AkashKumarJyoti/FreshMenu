import React, { useState, useContext } from 'react'
import './Navbar.css';
import {assets} from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify'

const Navbar = ({setShowLogin}) => {

  const [menu, setMenu] = useState("home");
  const {getTotalAmount, token, setToken} = useContext(StoreContext); 
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/');
    toast.info("Logged out");
  }
  
  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className='logo' /></Link>
      <ul className='navbar-menu'>
        <Link to='/' className={menu==="home" ? "active" : ""} onClick={() => setMenu("home")}>home</Link>
        <a href='#explore-menu' className={menu==="menu" ? "active" : ""} onClick={() => setMenu("menu")}>menu</a>
        <a href='#app-download' className={menu==="mobile" ? "active" : ""} onClick={() => setMenu("mobile")}>mobile-app</a>
        <a href='#footer' className={menu ==="contact" ? "active" : ""} onClick={() => setMenu("contact")}>contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt='' />
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt='' /></Link>
          {getTotalAmount() > 0 && <div className="dot"></div>}
        </div>
        {!token ? <button onClick={() => setShowLogin(true)}>Sign In</button> 
          : <div className='navbar-profile'>
              <img src={assets.profile_icon} alt='' />
              <ul className="nav-profile-dropdown">
                <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt='' /><p>Orders</p></li>
                <hr />
                <li onClick={logout} ><img src={assets.logout_icon} alt='' /><p>Logout</p></li>
              </ul>
          </div> }
        
      </div>
    </div>
  )
}

export default Navbar