function ProductsContainer({children}) {
  return (
    <div initial={{opacity: 0, y:50}} animate={{opacity: 1, y:0}} transition={{duration:.6}} className="grid grid-cols-1 min-[600px]:grid-cols-2 min-[850px]:grid-cols-3 gap-4 place-items-center">
      {children}
    </div>
  )
}

export default ProductsContainer