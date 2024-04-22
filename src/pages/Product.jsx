import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Header from "../components/Header"
import Loading from "../components/Loading"
import Single from "../components/ProductCard/Single"
import Container from '../components/Container'
import useAddCart from "../hooks/useAddCart"
import SuccessAlert from "../components/SuccessAlert"

const single_API = 'https://electroshop.liara.run/api/product/';

function Product() {

  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addToCart, showAlert, setShowAlert, message] = useAddCart();

  useEffect(() => {
    fetchData(single_API + id);
  }, []);
  
  async function fetchData(URL) {
    setLoading(true);
    try {
      const resp = await fetch(URL);
      const data = await resp.json();
      setProduct(data);
    } catch(err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if(error) {
    return <p className="p-2">{error}</p>;
  }
  
  return (
    <>
      {loading && <Loading />}
      <Header />
      <Container style="mt-24">
        {product && <Single {...product} addToCart={addToCart} />}
      </Container>
      {showAlert && <SuccessAlert open={showAlert} setOpen={setShowAlert}>{message}</SuccessAlert>}
    </>
  )
}

export default Product