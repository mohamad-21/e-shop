function Container({children, style = ''}) {
  return (
    <div className={`mx-auto px-8 w-full max-w-5xl ${style}`}>
      {children}
    </div>
  )
}

export default Container