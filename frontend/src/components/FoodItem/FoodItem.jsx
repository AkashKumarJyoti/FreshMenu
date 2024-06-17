import React, { useContext } from 'react'
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
 
const FoodItem = ({id, name, price, description, image}) => {
  // const [itemCount, setItemCount] = useState(0);    // This state will be created for all the food-items which is not a good practice.
  const {cartItems, addToCartItem, removeCartItem, url} = useContext(StoreContext);
  
  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={url+"/images/"+image} alt='' />
        {
          !cartItems[id]
            ? <img className='add' onClick={() => addToCartItem(id)} src={assets.add_icon_white} alt='' />
            : <div className="food-item-counter">
                <img onClick={() => removeCartItem(id)} src={assets.remove_icon_red} alt='' />
                <p>{cartItems[id]}</p>
                <img onClick={() => addToCartItem(id)} src={assets.add_icon_green} alt='' />
              </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  )
}

export default FoodItem
