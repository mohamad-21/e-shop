function ProductsContainer({children}) {
  return (
    <div initial={{opacity: 0, y:50}} animate={{opacity: 1, y:0}} transition={{duration:.6}} className="grid gap-4 place-items-center" style={{
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
    }}>
      {children}
    </div>
  )
}

export default ProductsContainer