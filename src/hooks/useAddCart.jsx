import { useContext, useState } from "react"
import AppContext from "../contexts/AppContext"
import User from "../contexts/User";

const cart_ADD_API = 'https://melectroshop.000webhostapp.com/api/cart/add/';

function useAddCart() {
  
  const [showAlert, setshowAlert] = useState(false);
  const [message, setMessage] = useState('');
  const user = useContext(User);
  const { getCart } = useContext(AppContext);

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
      setshowAlert(true);
      setMessage('Product added to your cart');
    }
    else if(resp.status === 401) {
      setMessage('you\'re not authorized');
      setshowAlert(true)
    }
  }

  return [addToCart, showAlert, setshowAlert, message];
}

export default useAddCart