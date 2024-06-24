import { useContext, useEffect, useState } from "react"
import Container from "../components/Container"
import Footer from "../components/Footer"
import Header from "../components/Header"
import AppContext from "../contexts/AppContext"
import User from "../contexts/User";
import Title from "../components/Title"
import CartItem from "../components/ProductCard/CartItem"
import { Link } from "react-router-dom"
import SuccessAlert from "../components/SuccessAlert"

const cart_remove_api = 'https://mohamad21.ir/electroshop/api/cart/remove/';
const cart_clear_api = 'https://mohamad21.ir/electroshop/api/cart/clear';

function Cart() {

  const [resultText, setResultText] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);
  const [cleared, setCleared] = useState(false);
  const { cart, getCart, setCart } = useContext(AppContext);
  const user = useContext(User);

  useEffect(() => {
    setResultText(cart.length ? 'Your cart items' : 'Your cart is clear...');
  }, [cart]);


  async function deleteItem(id) {
    const resp = await fetch(cart_remove_api + id, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${user.token}`
      },
    });
    if (resp.ok) {
      getCart();
      setAddedToCart(true);
    }
  }

  async function clearCart() {

    const resp = await fetch(cart_clear_api, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });

    if (resp.ok && resp.status === 200) {
      setCleared(true);
      setCart([]);
    }
    const data = await resp.json();
    console.log(data);

  }

  return (
    <>
      <Header />
      <Container style="my-10">
        {user.loggedIn ? (
          <>
            <Title style="mb-10">{resultText}</Title>
            {cart.length < 1 && (
              <Link to="/shop" className="text-lg font-medium text-darkblue underline">Shop</Link>
            )}
            <div className="flex flex-col gap-2 mb-24">
              {cart.map(item => (
                <CartItem {...item} key={item.id} deleteItem={deleteItem} />
              ))}
            </div>
            {cart.length > 0 && (
              <div className="flex gap-3 justify-end max-sm:text-sm">
                <button className="border border-darkblue py-2.5 px-5 rounded hover:bg-darkblue hover:text-white duration-200" onClick={clearCart}>Clear Cart</button>
                <Link to="/checkout" className="bg-blue-500 text-white py-2.5 px-5 rounded hover:opacity-75 duration-200">Checkout</Link>
              </div>
            )}
          </>
        ) : (
          <Title>you must be login to get your shopping cart</Title>
        )}
      </Container>
      {addedToCart && (
        <SuccessAlert open={addedToCart} setOpen={setAddedToCart}>Item removed from your cart</SuccessAlert>
      )}
      {cleared && (
        <SuccessAlert open={cleared} setOpen={setCleared}>Cart cleared</SuccessAlert>
      )}
      <Footer />
    </>
  )
}

export default Cart