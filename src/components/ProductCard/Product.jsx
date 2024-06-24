import { Link } from "react-router-dom";
import { RiShoppingCartFill } from "react-icons/ri";
import { FaInfoCircle } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import RatingBox from "./RatingBox";
import { useContext } from "react";
import AnimatedCard from '../AnimatedCard';
import AppContext from "../../contexts/AppContext";

const image_API = 'https://mohamad21.ir/electroshop/assets/products/';

function Product({ id, title, image, price, avg_rating, addToCart, discount }) {

  const { calculateDiscount } = useContext(AppContext);

  return (
    <AnimatedCard className="bg-darkblue text-white rounded-md overflow-hidden group">
      <div className="relative group/image">
        <Link to={`/product/${id}`} className="flex max-h-[270px]">
          <img src={image_API + image} alt={title} className="object-cover w-full" />
        </Link>
        <button className="absolute top-4 -right-full bg-darkblue p-3 rounded-md hover:opacity-80 duration-200 group-hover/image:right-4" onClick={() => addToCart(id, 1)}>
          <RiShoppingCartFill />
        </button>
      </div>
      <div className="py-6 px-5 flex flex-col gap-3">
        <Link to={`/product/${id}`}>
          <h2 className="truncate font-medium leading-3">{title}</h2>
        </Link>
        <div className="flex gap-2.5 text-sm">
          <del className="text-gray-400">${calculateDiscount(price, discount)}</del>
          <span className="font-medium">${price}</span>
        </div>
        <div className="flex gap-1">
          <RatingBox product_id={id} rating={avg_rating} />
        </div>
      </div>
    </AnimatedCard>
  )
}

export default Product