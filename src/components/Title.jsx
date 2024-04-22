function Title({children, style}) {
  return (
    <h1 className={`text-3xl bg-gradient-to-r max-w-max from-sky-400/100 to-lightblue bg-clip-text text-transparent font-medium max-sm:text-2xl ${style ?? ''}`}>{children}</h1>
  )
}

export default Title