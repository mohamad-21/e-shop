import { useContext } from "react"
import AppContext from "../contexts/AppContext"
import { easeInOut, motion } from "framer-motion";

function Overlay() {

  const { setShowOverlay, setShowSidebar } = useContext(AppContext);

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity:1}} transition={{duration: .2, ease: easeInOut}} className="fixed z-[7] inset-0 bg-black/75" onClick={() => {
      setShowOverlay(false);
      setShowSidebar(false);
    }}></motion.div>
  )
}

export default Overlay