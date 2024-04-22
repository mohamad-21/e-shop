function Label({value, error, htmlFor}) {
  return (
    <label className={`cursor-pointer text-sm ${error ? 'text-red-400' : 'text-darkblue/90'}`} htmlFor={htmlFor}>{value}</label>
  )
}

export default Label