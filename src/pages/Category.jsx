import { useState, useEffect } from "react"
import Header from "../components/Header"
import Loading from "../components/Loading"
import Product from "../components/ProductCard/Product"
import ProductsContainer from "../components/ProductsContainer"
import Footer from "../components/Footer"
import Title from "../components/Title"
import Container from "../components/Container"
import { motion } from "framer-motion"
import { useParams } from "react-router-dom"
import Pagination from "../components/Pagination"
import useAddCart from "../hooks/useAddCart"
import SuccessAlert from "../components/SuccessAlert"

const products_API = 'https://mohamad21.ir/electroshop/api/category/';

function Category() {

  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [productsByPage, setProductsByPage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addToCart, showAlert, setShowAlert, message] = useAddCart();

  useEffect(() => {
    fetchData(products_API + category);
  }, [category]);

  async function fetchData(URL) {
    setLoading(true);
    try {
      const resp = await fetch(URL);
      const data = await resp.json();
      setProducts(data);
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
        <Title style="mb-20 mx-auto text-4xl max-sm:text-3xl capitalize">{category}s</Title>
        <ProductsContainer>
          {products && products.map((pro, idx) => {
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
        {showAlert && <SuccessAlert open={showAlert} setOpen={setShowAlert}>{message}</SuccessAlert>}
      </Container>
      <Footer />
    </>
  )

}

export default Category