import { useEffect, useState } from "react"
import Header from "../components/Header"
import Loading from "../components/Loading"
import Product from "../components/ProductCard/Product"
import ProductsContainer from "../components/ProductsContainer"
import Footer from "../components/Footer"
import Title from "../components/Title"
import Container from "../components/Container"
import Pagination from "../components/Pagination"
import useAddCart from "../hooks/useAddCart"
import SuccessAlert from "../components/SuccessAlert"

const products_API = 'https://electroshop.liara.run/api/products';

function Shop() {

  const [products, setProducts] = useState([]);
  const [productsByPage, setProductsByPage] = useState([]);
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
      setProducts(data);
      console.log(data)
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
      <Container style="my-36">
        <header className="mb-20">
          <Title style="text-4xl max-sm:text-3xl">All Products</Title>
        </header>
        <ProductsContainer>
          {productsByPage && productsByPage.map(pro => (
            <Product {...pro} addToCart={addToCart} key={pro.id} />
          ))}
        </ProductsContainer>
        <Pagination
          products={products}
          setProductsByPage={setProductsByPage}
        />
      </Container>
      {showAlert && <SuccessAlert open={showAlert} setOpen={setShowAlert}>{message}</SuccessAlert>}
      <Footer />
    </>
  )

}

export default Shop