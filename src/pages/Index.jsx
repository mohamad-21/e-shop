import { useState, useEffect } from "react"
import Header from "../components/Header"
import Loading from "../components/Loading"
import Product from "../components/ProductCard/Product"
import ProductsContainer from "../components/ProductsContainer"
import Footer from "../components/Footer"
import ShowMore from "../components/ShowMore"
import Title from "../components/Title"
import Container from "../components/Container"
import Hero1 from "../components/Hero/Hero1"
import Hero2 from "../components/Hero/Hero2"
import useAddCart from "../hooks/useAddCart"
import SuccessAlert from "../components/SuccessAlert"

const products_API = 'https://electroshop.liara.run/api/products/limited';

function Index() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addToCart, showAlert, setShowAlert, message] = useAddCart();

  useEffect(() => {
    fetchData(products_API);
  }, []);
  
  async function fetchData(URL) {
    setLoading(true);
    try {
      const resp = await fetch(URL);
      const data = await resp.json();
      if(!resp.ok) {
        throw new Error(data.message || resp.text);
      }
      setProducts(data);
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
      <Hero1 />
      <Container style="my-36">
        <Title style="mb-20 mx-auto text-4xl max-sm:text-3xl">Latest Products</Title>
        <ProductsContainer>
          {products && products.map(pro => (
            <Product {...pro} addToCart={addToCart} key={pro.id} />
          ))}
          <ShowMore />
        </ProductsContainer>
        {showAlert && <SuccessAlert open={showAlert} setOpen={setShowAlert}>{message}</SuccessAlert>}
      </Container>
      <Hero2 />
      <Footer />
    </>
  )

}

export default Index