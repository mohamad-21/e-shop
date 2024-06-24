import { useEffect, useState } from "react"
import Header from "../components/Header"
import Loading from "../components/Loading"
import Product from "../components/ProductCard/Product"
import ProductsContainer from "../components/ProductsContainer"
import Footer from "../components/Footer"
import Title from "../components/Title"
import Container from "../components/Container"
import { useLocation } from "react-router-dom"
import NotFound from "./NotFound";
import { motion } from "framer-motion"
import Pagination from "../components/Pagination"
import useAddCart from "../hooks/useAddCart"
import SuccessAlert from "../components/SuccessAlert"

const search_API = 'https://mohamad21.ir/electroshop/api/products/search/';

function Shop() {

  const { search } = useLocation();
  const searchTerm = new URLSearchParams(search).get('q');
  if (!searchTerm) return <NotFound />

  const [products, setProducts] = useState([]);
  const [productsByPage, setProductsByPage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resultText, setResultText] = useState('');
  const [addToCart, showAlert, setShowAlert, message] = useAddCart();

  useEffect(() => {
    fetchSearch();
  }, [search]);

  async function fetchSearch() {
    setLoading(true);
    setProducts([]);
    try {
      const resp = await fetch(search_API + searchTerm);
      if (resp.status === 404 || !resp.ok) {
        setResultText(`oops... no results found for \"${searchTerm}\"`);
        return;
      }
      const data = await resp.json();
      setProducts(data);
      setResultText(`Search Results for \"${searchTerm}\"`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (error) {
    return <p className="p-2">{error}</p>;
  }

  return (
    <>
      {loading && <Loading />}
      <Header />
      <Container style="mx-auto my-36">
        <Title style="mb-20 max-sm:text-2xl">{resultText}</Title>
        {products.length > 0 && (
          <>
            <ProductsContainer>
              {productsByPage && productsByPage.map((pro, idx) => {
                const proDelay = (idx + 1) / 3;
                return (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 50
                    }}
                    animate={{
                      opacity: 1,
                      y: 1
                    }}
                    transition={{
                      duration: proDelay,
                    }}
                    key={pro.id}
                  >
                    <Product {...pro} addToCart={addToCart} />
                  </motion.div>
                )
              })}
            </ProductsContainer>
            <Pagination
              products={products}
              setProductsByPage={setProductsByPage}
            />
          </>
        )}
        {showAlert && <SuccessAlert open={showAlert} setOpen={setShowAlert}>{message}</SuccessAlert>}
      </Container>
      <Footer />
    </>
  )

}

export default Shop