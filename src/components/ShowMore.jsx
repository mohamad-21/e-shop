import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

function ShowMore() {
  return (
    <Link to="/shop" className="flex items-center gap-2 text-blue-500 group font-medium text-lg">Show more <div className="group-hover:translate-x-1 transition"><FaArrowRight size={15} /></div></Link>
  )
}

export default ShowMore