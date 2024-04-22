import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";

const image_API = 'https://electroshop.liara.run/assets/products/';

function CartItem({ id, title, image, price, total, product_id, deleteItem, removable=true}) {
  return (
    <div className="flex items-start max-w-md gap-4 bg-darkblue text-white py-7 px-4 rounded-md relative">
      <Link to={`/product/${product_id}`} className="shrink-0">
        <img src={image_API + image} className="w-16 h-16 rounded" alt={title} />
      </Link>
      <div className="flex w-full flex-col gap-3 justify-around max-sm:text-sm">
        <div className="flex items-start gap-4">
          <h2 className="inline">
            <Link to={`/product/${product_id}`} className="hover:text-lightblue font-medium inline">
              {title}
            </Link>
            <span className="shrink-0 ml-1 inline"><MdClose style={{display:'inline'}} /> <b>{total}</b></span> 
          </h2>
        </div>
        <div className="flex gap-2.5 text-xs">
          <del className="text-gray-400">${price - (Math.floor(Math.random() * 20) - 100) + '.00'}</del>
          <span className="font-medium">${price}</span>
        </div>
      </div>
      {removable && <button className="text-red-400 ml-auto max-[460px]:right-4" onClick={() => deleteItem(id)}><MdClose size={20} /></button>}
    </div>
  )
}

export default CartItem