import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);    // We are exporting it so that other component can consume it.

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = 'http://localhost:4000';
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const fetchFoodList = async () => {
    const response = await axios.get(url+"/api/food/list");
    setFoodList(response.data.data);
  }

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if(localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem('token'));
      }
    }
    loadData();
  }, [])

  const loadCartData = async (token) => {
    const response = await axios.post(url+'/api/cart/get', {}, {headers: {token}})

    setCartItems(response.data.cartData);
  }

  const addToCartItem = async (itemId) => {
    if(!cartItems[itemId]) { // If that itemId doest not exist in cartItem we will add it
      setCartItems((prev) => ({...prev, [itemId]: 1}))
    }
    else {
      setCartItems((prev) => ({...prev, [itemId]: prev[itemId]+1}))
    }
    if(token) {
      await axios.post(url + "/api/cart/add", {itemId}, {headers:{token}})
    }
  }
  const removeCartItem = async (itemId) => {
      setCartItems((prev) => ({...prev, [itemId]: prev[itemId]-1}))

      if(token) {
        await axios.post(url + "/api/cart/remove", {itemId}, {headers:{token}})
      }
  }

  const getTotalAmount = () => {
    let totalAmount = 0;
    for(const item in cartItems) {
      if(cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  }

  const contextValue = {
    food_list, 
    cartItems, 
    setCartItems,
    addToCartItem,
    removeCartItem,
    getTotalAmount,
    url,
    token, 
    setToken
  }
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider;