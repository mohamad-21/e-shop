import React from 'react'
import { motion } from "framer-motion"

function AnimatedCard({fadeStyle='from-bottom', className, children, style}) {
  if(fadeStyle === 'from-bottom' || !fadeStyle) {
    return (
      <motion.div style={style} initial={{opacity:0, y:50}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:.7}} className={className} >{children}</motion.div>
    )
  } else if(fadeStyle === 'from-right') {
    return (
      <motion.div style={style} initial={{opacity:0, x:50}} whileInView={{opacity:1, x:0}} viewport={{once:true}} transition={{duration:.7}} className={className} >{children}</motion.div>
    )
  } else if(fadeStyle === 'from-left') {
    return (
      <motion.div style={style} initial={{opacity:0, x:-50}} whileInView={{opacity:1, x:0}} viewport={{once:true}} transition={{duration:.7}} className={className} >{children}</motion.div>
    )
  } else if(fadeStyle === 'from-top') {
    return (
      <motion.div style={style} initial={{opacity:0, y:-50}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:.7}} className={className} >{children}</motion.div>
    )
  }
}

export default AnimatedCard