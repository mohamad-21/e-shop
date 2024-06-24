import { useContext, useEffect, useState } from "react";
import User from "../contexts/User";
import AppContext from "../contexts/AppContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";
import Label from "../components/Form/Label";
import Input from "../components/Form/Input";
import Textarea from "../components/Form/Textarea";
import Submit from "../components/Form/Submit";
import Select from 'react-select'
import CartItem from "../components/ProductCard/CartItem";
import SuccessAlert from "../components/SuccessAlert";
import Title from "../components/Title";

const checkout_api = 'https://mohamad21.ir/electroshop/api/checkout';
const options = [
  { value: 'united-states', label: 'United states' },
  { value: 'germany', label: 'Germany' },
  { value: 'united-kingdom', label: 'United kingdom' },
  { value: 'spain', label: 'Spain' },
  { value: 'france', label: 'France' },
  { value: 'canada', label: 'Canada' },
  { value: 'turkey', label: 'Turkey' },
]

function Checkout() {

  const [number, setNumber] = useState('');
  const [region, setRegion] = useState('');
  const [address, setAddress] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const user = useContext(User);
  const { getCart, cart } = useContext(AppContext);

  useEffect(() => {

    if (number.trim() && region.trim() && address.trim()) {
      return setSubmitDisabled(false);
    }
    setSubmitDisabled(true);

  }, [number, region, address])

  async function handleSubmit(e) {

    e.preventDefault();
    setError('');

    if (!number.trim() || !region.trim() || !address.trim()) {
      setError('all fields is required');
      document.documentElement.scrollTop = 0;
      return;
    }

    const data = {
      number,
      region,
      address,
    }

    const resp = await fetch(checkout_api, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(data)
    });
    const message = await resp.json();
    console.log(message);

    if (resp.ok && resp.status === 200) {
      getCart();
      clearForm();
      setShowSuccess(true);
    }

  }

  let totalPrice = 0;
  cart.forEach(item => {
    totalPrice += (item.price * item.total);
  })

  function clearForm() {
    setNumber('');
    setRegion('');
    setAddress('');
    setSubmitDisabled(true);
    setError('');
  }

  return (
    <>
      <Header />
      <Container style="my-24">
        {cart.length ? (
          <>
            <div className="flex flex-col gap-2 mb-24">
              <h2 className="text-xl mb-3">Order Details</h2>
              {cart.map(item => (
                <CartItem {...item} key={item.id} removable={false} />
              ))}
              <h2 className="text-lg mt-3">Total amount: <b className="text-sky-600">${totalPrice.toLocaleString()}</b></h2>
            </div>
            <form className="rounded-md w-full max-w-md flex flex-col gap-6" onSubmit={(e) => handleSubmit(e)}>
              {error && <p className="text-red-400 text-center">all fields is required</p>}
              <h2 className="text-xl">Personal Information</h2>
              <div className="flex flex-col">
                <Label value="name" htmlFor="name" />
                <Input
                  type="text"
                  name="name"
                  value={user.name ?? ''}
                  readOnly={true}
                />
              </div>
              <div className="flex flex-col">
                <Label value="email" htmlFor="email" />
                <Input
                  type="text"
                  name="email"
                  value={user.email ?? ''}
                  readOnly={true}
                />
              </div>
              <h2 className="text-xl mt-6">Billing Details</h2>
              <div className="flex flex-col">
                <Label value="number" htmlFor="number" />
                <Input
                  type="number"
                  name="number"
                  value={number}
                  setValue={setNumber}
                />
              </div>
              <div className="flex flex-col">
                <Label value="region" htmlFor="region" />
                <Select name="region" className="w-full mt-2 text-sm" onChange={(e) => setRegion(e.value)} options={options} placeholder="select your region" />
              </div>
              <div className="flex flex-col">
                <Label value="address" htmlFor="address" />
                <Textarea
                  name="address"
                  value={address}
                  setValue={setAddress}
                />
              </div>
              <div className="flex flex-col">
                <Submit value={`Checkout for $${totalPrice.toLocaleString()}`} disabled={submitDisabled} />
              </div>
            </form>
          </>
        ) : (
          <Title>you have no anything in your cart to order</Title>
        )}
        {showSuccess && <SuccessAlert open={showSuccess} setOpen={setShowSuccess} >your products ordered successfully. <br /> we send your order soon</SuccessAlert>}
      </Container>
      <Footer />
    </>
  )
}

export default Checkout