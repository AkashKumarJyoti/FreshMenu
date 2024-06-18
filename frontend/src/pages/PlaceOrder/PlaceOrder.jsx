import React, { useState,useContext, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const {getTotalAmount, token, food_list, cartItems, url} = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data, [name]: value}));
  }

  const placeOrder = async(event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=> {
      if(cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalAmount()+5
    }

    // Make API call for the order place
    let response = await axios.post(url+'/api/order/place', orderData,{headers:{token}});
    if(response.data.success) {
      // We will get the session url
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else {
      alert("Error");
    }
  }

  const navigate = useNavigate();
  useEffect(() => {
    if(!token) {
      navigate('/cart');
    }
    else if(getTotalAmount() === 0) {
      toast.info("Please Select Item First");
      navigate('/cart');
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='LastName'/>
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='city' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Pin code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone' />
      </div>
      <div className="place-order-right">
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
            <button type='submit'>Proceed to Payment</button>
          </div>
      </div>
    </form>
  )
}

export default PlaceOrder