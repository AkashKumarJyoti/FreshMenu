import React, { useEffect } from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({category, setCategory}) => {

  useEffect(() => {
    const menuList = document.getElementById('explore-menu-list');
    const checkScroll = () => {
      if (menuList.scrollWidth > menuList.clientWidth) {
        menuList.classList.add('scrollable');
      } else {
        menuList.classList.remove('scrollable');
      }
    };
    
    checkScroll(); // Initial check
    window.addEventListener('resize', checkScroll); // Check on resize
    
    return () => {
      window.removeEventListener('resize', checkScroll); // Cleanup on component unmount
    };
  }, []);

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
      <div className="explore-menu-list" id="explore-menu-list">
        {
          menu_list.map((item, index) => {
            return (
              <div className="explore-menu-list-item" key={index} 
                    onClick={()=>setCategory((prev) => prev===item.menu_name ? "All": item.menu_name)} >
                <img className={category===item.menu_name ? "active" : ""} src={item.menu_image} alt=''/>
                <p>{item.menu_name}</p>
              </div>
            )
          })
        }
      </div>
      <hr />
    </div>
  );
}

export default ExploreMenu;
