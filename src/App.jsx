import { Route, Routes } from "react-router-dom"
import Index from "./pages/Index"
import Product from "./pages/Product"
import Shop from "./pages/Shop"
import Category from "./pages/Category"
import Login from "./pages/Login"
import Search from "./pages/Search"
import Cart from "./pages/Cart"
import { useContext } from "react"
import Overlay from "./components/Overlay"
import AppContext from "./contexts/AppContext"
import Logout from "./pages/Logout"
import Checkout from "./pages/Checkout"
import Alert from './components/Alert';
import Register from "./pages/Register"

function App() {

  const { showOverlay, message, setMessage } = useContext(AppContext);

  return (
    <div className="min-h-screen font-Inter flex flex-col text-darkblue">
      {showOverlay && <Overlay />}
      {message && <Alert open={message} setOpen={setMessage}>{message}</Alert>}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  )

}

export default App
