import { useContext } from "react"
import Navbar from "./Navbar"
import Search from "./Search"
import Sidebar from "./Sidebar"
import AppContext from "../contexts/AppContext"

function Header() {

  const { showSearchModal } = useContext(AppContext);

  return (
    <header className="bg-darkblue">
      <Navbar />
      <Sidebar />
      {showSearchModal && <Search />}
    </header>
  )
}

export default Header