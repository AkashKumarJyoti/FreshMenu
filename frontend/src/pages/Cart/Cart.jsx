import React, { useContext } from 'react'
import "./Cart.css";
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const navigate = useNavigate();
  const { food_list, cartItems, removeCartItem, getTotalAmount, url } = useContext(StoreContext);

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index)=>{
          if(cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className='cart-items-title cart-items-item'>
                  <img src={url+"/images/"+item.image} alt='' />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.price * cartItems[item._id]}</p>
                  <p onClick={()=>removeCartItem(item._id)} className='cross'>X</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Card Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalAmount() > 0 ? 5 : 0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalAmount() > 0 ? getTotalAmount()+5 : 0}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>Proceed to Checkout</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Apply your promocode here</p> 
            <div className='cart-promocode-input'>
              <input type='text' placeholder='Promocode' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
