import { Link } from "react-router-dom";
import { RiShoppingCartFill } from "react-icons/ri";
import { FaInfoCircle } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import RatingBox from "./RatingBox";
import { useContext } from "react";
import AnimatedCard from '../AnimatedCard';
import AppContext from "../../contexts/AppContext";


const image_API = 'https://electroshop.liara.run/assets/products/';

function Product({id, title, image, price, avg_rating, addToCart, discount}) {

  const { calculateDiscount } = useContext(AppContext);

  return (
    <AnimatedCard className="text-darkblue relative overflow-hidden group max-w-xs">
      <div className="w-full">
        <img src={image_API + image} alt={title} className="rounded-md w-full" />
        <div className="absolute bottom-0 left-0 right-0 pt-8 pb-7 px-4 flex gap-1 bg-gradient-to-t from-darkblue/90 from-50% to-transparent text-lg z-10">
          <RatingBox product_id={id} rating={avg_rating} />
        </div>
      </div>
      <div className="absolute bottom-0 translate-y-full w-full bg-darkblue text-white pt-12 pb-6 px-6 flex flex-col justify-start group-hover:translate-y-0 group-hover:h-full duration-200 ease-in-out rounded-md">
        <div className="absolute top-5 right-3 text-lg">
          <FaInfoCircle />
        </div>
        <h2 className="truncate mb-3 font-medium">{title}</h2>
        <div className="flex gap-2.5 text-sm">
          <del className="text-gray-400">${calculateDiscount(price, discount)}</del>
          <span className="font-medium">${price}</span>
        </div>
        <div className="flex items-center justify-center mt-7 text-sm gap-3 flex-wrap ">
          <button className="bg-blue-500 text-white py-2.5 w-full  rounded-md hover:opacity-80 transition duration-200 focus:ring-2 flex items-center justify-center gap-1.5" onClick={() => addToCart(id, 1)}><RiShoppingCartFill size={20} /> Add to cart</button>
          <Link to={`/product/${id}`} className="py-2.5 w-full flex items-center justify-center gap-1.5 group/seemore">Show more <div className="group-hover/seemore:translate-x-1 transition"><FaArrowRight size={15} /></div></Link>
        </div>
      </div>
    </AnimatedCard>
  )
}

export default Product