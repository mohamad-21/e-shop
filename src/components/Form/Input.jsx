function Input({type, name, value, setValue, error, placeholder, className = '', readOnly}) {

  function handleChange(e) {
    if(readOnly) return;
    setValue(e.target.value);
  }

  return (
    <input type={type} className={`${className} outline-none text-sm border-b-2 focus:border-b-lightblue py-2.5 duration-200 ${value ? 'border-b-lightblue' : ''} ${error ? 'border-b-red-400' : ''} read-only:border-b-darkblue read-only:opacity-75 read-only:focus:border-b-darkblue`}
    name={name} id={name} value={value} onChange={(e) => handleChange(e)} placeholder={`${placeholder ?? `Enter your ${name}`}`} readOnly={readOnly} min="1" />
  )
}

export default Input