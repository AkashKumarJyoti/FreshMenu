import React, { useEffect, useContext } from 'react'
import './Verify.css'
import {StoreContext} from '../../context/StoreContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const {url} = useContext(StoreContext);

  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(url+'/api/order/verify', {success, orderId});
    console.log("Hola");
    if(response.data.success) {
      navigate("/myorders")
    }
    else {
      navigate('/')
    }
  }

  useEffect(() => {
    verifyPayment();
  }, [])

  return (
    <div className='verify'>
      <div className="spinner">

      </div>
    </div>
  )
}

export default Verify