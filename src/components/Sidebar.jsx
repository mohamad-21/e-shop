import { useContext } from "react"
import AppContext from "../contexts/AppContext"
import { IoMdClose } from "react-icons/io";
import { NavLink } from "react-router-dom"
import { IoIosArrowDown } from "react-icons/io";
import { MdLaptop } from "react-icons/md";
import { MdCameraAlt } from "react-icons/md";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { BiMobileAlt } from "react-icons/bi";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FaShopify } from "react-icons/fa";
import User from "../contexts/User";

function Sidebar() {

  const { 
    showSidebar, 
    setShowSidebar,
    setShowOverlay
  } = useContext(AppContext);
  const user = useContext(User);

  return (
    <aside className={`fixed top-0 bottom-0 bg-black/80 backdrop-blur-md z-10 w-full max-w-[360px] text-white p-8 transition duration-200 ease-in-out left-0 ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
      <header className="flex items-center justify-between mb-24">
        <h1 className="text-xl">E-Shop</h1>
        <button className="hover:opacity-75 transition" onClick={() => {
          setShowSidebar(false);
          setShowOverlay(false);
        }}>
          <IoMdClose size={30} />
        </button>
      </header>
      <ul className="flex items-center justify-center flex-col gap-4">
        <li><NavLink to="#" className="hover:opacity-75 transition text-lg">Home</NavLink></li>
        <li className="relative group cursor-pointer">
          <div className='flex items-center gap-0.5 group-hover:pb-3'>Category <IoIosArrowDown className="group-hover:rotate-180 transition duration-300" />
            <ul className="absolute top-full left-0 bg-darkblue pb-3 w-[170px] rounded-b-lg translate-y-5 opacity-0 pointer-events-none transition group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto duration-300 z-10">
              <li><NavLink to="/category/laptop" className="py-2 px-4 w-full hover:bg-blue-500 transition flex items-center gap-3"><MdLaptop size={18} />Laptop</NavLink></li>
              <li><NavLink to="/category/smartphone" className="py-2 px-4 w-full hover:bg-blue-500 transition flex items-center gap-3"><BiMobileAlt size={18} /> Smartphone</NavLink></li>
              <li><NavLink to="/category/camera" className="py-2 px-4 w-full hover:bg-blue-500 transition flex items-center gap-3"><MdCameraAlt size={18} />Camera</NavLink></li>
              <li><NavLink to="/category/headphone" className="py-2 px-4 w-full hover:bg-blue-500 transition flex items-center gap-3"><FaHeadphonesSimple size={18} />Headphone</NavLink></li>
            </ul>
          </div>
        </li>
        
        <li className="relative group cursor-pointer">
          <div className='flex items-center gap-0.5 group-hover:pb-3'>{user.name} <IoIosArrowDown className="group-hover:rotate-180 transition duration-300" />
            <ul className="absolute top-full left-0 bg-darkblue pb-3 w-[170px] rounded-b-lg translate-y-5 opacity-0 pointer-events-none transition group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto duration-300 z-10">
              <li><NavLink to="/logout" className="py-2 px-4 w-full hover:bg-red-500 transition flex items-center gap-3"><RiLogoutCircleLine size={18} /> Logout</NavLink></li>
            </ul>
          </div>
        </li>
        <li><NavLink to="#" className="hover:opacity-75 transition flex items-center gap-1.5 text-lg"><FaShopify /> Shop</NavLink></li>
        <li><NavLink to="#" className="hover:opacity-75 transition text-lg">Contact</NavLink></li>
      </ul>
    </aside>
  )
}

export default Sidebar