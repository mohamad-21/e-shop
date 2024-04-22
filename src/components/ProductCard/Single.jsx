import { motion } from "framer-motion";
import { RiShoppingCartFill } from "react-icons/ri";
import RatingBox from "./RatingBox";

const image_API = 'https://electroshop.liara.run/assets/products/';

function Single({id, title, image, body, price, avg_rating, addToCart}) {
  return (
    <>
      <div className="text-darkblue relative overflow-hidden group max-w-md mx-auto pb-44">
        <div className="w-full">
          <img src={image_API + image} alt={title} className="rounded-md w-full" />
        </div>
        <div className="py-8">
          <h2 className="mb-4 text-xl font-medium">{title}</h2>
          <div className="mb-4 flex gap-1 text-xl">
            <RatingBox product_id={id} rating={avg_rating} />
          </div>
          <p className="mb-4 text-sm leading-6 text-gray-600">{body}</p>
          <div className="flex gap-2.5">
            <del className="text-gray-500">${price - (Math.floor(Math.random() * 20) - 100) + '.00'}</del>
            <span className="font-medium">${price}</span>
          </div>
        </div>
      </div>
      <motion.div animate={{ bottom:0 }} className="fixed -bottom-full left-0 h-24 flex items-center justify-between px-12 w-full bg-darkblue text-white">
        <div className="flex items-center gap-3 rounded-md">
          <img src={image_API + image} alt={title} className="w-10 h-10" />
          <h1 className="">{title}</h1>
        </div>
        <button className="bg-blue-500 text-white py-2.5 w-full max-w-[150px] rounded-md hover:opacity-80 transition duration-200 focus:ring-2 flex items-center justify-center gap-1.5"  onClick={() => addToCart(id, 1)}><RiShoppingCartFill size={20} /> Add to cart</button>
      </motion.div>
    </>
  )
}

export default Single