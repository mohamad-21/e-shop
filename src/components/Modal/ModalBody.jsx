import { easeInOut, motion } from "framer-motion"

function ModalBody({children, mode=''}) {
  return (
    <motion.div initial={{opacity:0, scale:0.3}} animate={{opacity:1, scale:1}} transition={{duration:.2, ease: easeInOut}} className={`bg-white ${mode === 'error' ? 'text-red-400' : 'text-darkblue'} p-7 rounded-md w-full max-w-sm `}>
      {children}
    </motion.div>
  )
}

export default ModalBody