import { useEffect, useState } from "react";
import AppContext from "./AppContext";
import User from "./User";

const getMe_API = 'https://electroshop.liara.run/api/auth/getMe';
const getCart_API = 'https://electroshop.liara.run/api/cart/get';
const cartInit = [];

function ContextContainer({children}) {

  const [showSidebar, setShowSidebar] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [cart, setCart] = useState(cartInit);
  const [loggedIn, setLoggedIn] = useState(false);
  const [info, setInfo] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    checkToken();
  }, []);
  
  useEffect(() => {
    loggedIn && getCart();
  }, [loggedIn]);

  async function checkToken() {
    const token = localStorage.getItem('token');
    if(!token) return;

    const resp = await fetch(getMe_API, {
      headers: {
        'Authorization': `Bearer ${token}`  
      }
    });

    if(!resp.ok) return;

    const data = await resp.json();
    login(data);
  }

  async function addToCart(id, total) {
    const resp = await fetch(cart_ADD_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
      body: JSON.stringify({
        'id': id,
        'total': total
      })
    });
    if(resp.ok) {
      getCart();
      setShowModal(true);
    }
  }

  async function getCart() {
    const resp = await fetch(getCart_API, {
      headers: {
        'Authorization': `Bearer ${info.token}`  
      }
    });

    if(!resp.ok) return;

    if(resp.status === 204) return setCart([]);

    if(resp.status === 200) {
      const data = await resp.json();
      data?.length && setCart(data);
    }

  }

  function login(data) {
    setLoggedIn(true);
    setInfo(data);
    localStorage.setItem('token', data.token);
  }

  function logout() {
    setLoggedIn(false);
    setInfo(null);
    setCart([]);
    localStorage.removeItem('token');
  }

  function calculateDiscount(price, discount) {
    discount = price - ((price * discount) / 100);
    return discount.toFixed(2);
  }
  
  return (
      <AppContext.Provider value={{
        showSidebar,
        setShowSidebar,
        showOverlay,
        setShowOverlay,
        cart,
        setCart,
        showSearchModal,
        setShowSearchModal,
        addToCart,
        getCart,
        message,
        setMessage,
        calculateDiscount
      }}>
        <User.Provider value={{
          loggedIn,
          setLoggedIn,
          ...info,
          setInfo,
          login,
          logout
        }}>
          {children}
        </User.Provider>
      </AppContext.Provider>
  )

}

export default ContextContainer;