import { NavLink } from "react-router-dom"
import { IoIosArrowDown } from "react-icons/io";
import { RiShoppingCartFill } from "react-icons/ri";
import { MdLaptop } from "react-icons/md";
import { MdCameraAlt } from "react-icons/md";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { BiMobileAlt } from "react-icons/bi";
import { FaShopify } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useContext } from "react";
import AppContext from '../contexts/AppContext';
import User from '../contexts/User';

function Navbar() {

  const { 
    setShowSidebar, 
    setShowOverlay, 
    cart,
    setShowSearchModal
  } = useContext(AppContext);
  const user = useContext(User);

  return (
    <nav className="flex items-center justify-between bg-darkblue text-white w-full px-8">
      <NavLink to='/'>E-Shop</NavLink>
      <ul className="flex items-center justify-center gap-4 max-[550px]:hidden">
        <li><NavLink to="/" className="hover:opacity-75 transition">Home</NavLink></li>
        <li className="relative group cursor-pointer">
          <div className='flex items-center gap-0.5 py-6 '>Category <IoIosArrowDown className="group-hover:rotate-180 transition duration-300" />
            <ul className="absolute top-full left-0 bg-darkblue pb-3 w-[170px] rounded-b-lg translate-y-5 opacity-0 pointer-events-none transition group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto duration-300 z-10">
              <li><NavLink to="/category/laptop" className="py-2 px-4 w-full hover:bg-blue-500 transition flex items-center gap-3"><MdLaptop size={18} />Laptop</NavLink></li>
              <li><NavLink to="/category/smartphone" className="py-2 px-4 w-full hover:bg-blue-500 transition flex items-center gap-3"><BiMobileAlt size={18} /> Smartphone</NavLink></li>
              <li><NavLink to="/category/camera" className="py-2 px-4 w-full hover:bg-blue-500 transition flex items-center gap-3"><MdCameraAlt size={18} />Camera</NavLink></li>
              <li><NavLink to="/category/headphone" className="py-2 px-4 w-full hover:bg-blue-500 transition flex items-center gap-3"><FaHeadphonesSimple size={18} />Headphone</NavLink></li>
            </ul>
          </div>
        </li>
        <li><NavLink to="/shop" className="hover:opacity-75 transition flex items-center gap-1.5"><FaShopify />Shop</NavLink></li>
        {user.loggedIn ? (
            <>
              <li className="relative group cursor-pointer">
                <div className='flex items-center gap-0.5 py-6 '>{user.name} <IoIosArrowDown className="group-hover:rotate-180 transition duration-300" />
                  <ul className="absolute top-full left-0 bg-darkblue pb-3 w-[170px] rounded-b-lg translate-y-5 opacity-0 pointer-events-none transition group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto duration-300 z-10">
                    <li><NavLink to="/logout" className="py-2 px-4 w-full hover:bg-red-500 transition flex items-center gap-3"><RiLogoutCircleLine size={18} /> Logout</NavLink></li>
                  </ul>
                </div>
              </li>
            </>
          ) : (
            <>
              <li><NavLink to="/login" className="hover:opacity-75 transition">Login</NavLink></li>
              <li><NavLink to="/signup" className="hover:opacity-75 transition">Signup</NavLink></li>
            </>
          )}

      </ul>
      <div className="flex items-center gap-5">
        <button className="hover:opacity-75 transition flex items-center gap-1.5" onClick={() => setShowSearchModal(true)}><IoSearch size={22} /></button>
        <NavLink to='/cart' className="relative hover:opacity-75 transition">
          <RiShoppingCartFill size={23} />
          <span className="absolute top-[-6px] right-[-7px] bg-red-500 leading-3 rounded-full py-[2px] px-[5px] text-xs font-medium">{cart.length}</span>
        </NavLink>
        <button className="py-6 hover:opacity-75 transition max-[550px]:block hidden" onClick={() => {
          setShowSidebar(true)
          setShowOverlay(true)
        }}>
          <MdMenu size={30} />
        </button>
      </div>
    </nav>
  )
}

export default Navbar