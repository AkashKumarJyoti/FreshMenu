import React, { useState, useRef, useEffect, useContext } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify'

const LoginPopup = ({ setShowLogin }) => {
  const containerRef = useRef(null);    // Used for closing the login window when user click outside window.

  const [currState, setCurrState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const {url, setToken} = useContext(StoreContext);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData(data=> ({...data, [name]:value}));
  }

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setShowLogin(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onLogIn = async (event) => {
    event.preventDefault(); 

    let newUrl = url;
    if(currState==="Login") {
      newUrl += "/api/user/login";
    }
    else {
      newUrl += "/api/user/register";
    }
    
    const response = await axios.post(newUrl, data);

    if(response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      currState === "Login" ? toast("Logged In", {position: 'bottom-right'}) : toast("Registered", {position: 'bottom-right'});
      setShowLogin(false);
    }
    else {
      alert(response.data.message);
    }
  }

  return (
    <div className='login-popup'>
      <form ref={containerRef} className="login-popup-container" onSubmit={onLogIn}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='' />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" && <input name='name' onChange={onChangeHandler} value={data.name} type='text' placeholder='Your Name' required />}
          <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Your Email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='Your Password' required />
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type='checkbox' required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" 
          ? <p>Don't have an account? <span onClick={() => setCurrState("Sign Up")}>Register</span></p>
          : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login</span></p>
        }
      </form>
    </div>
  );
};

export default LoginPopup;