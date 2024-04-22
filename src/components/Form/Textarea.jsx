function Textarea({name, value, setValue, error, placeholder, className = '', readOnly}) {

  function handleChange(e) {
    if(readOnly) return;
    setValue(e.target.value);
  }

  return (
    <textarea className={`${className} outline-none text-sm border-b-2 focus:border-b-lightblue py-2.5 duration-200 ${value ? 'border-b-lightblue' : ''} ${error ? 'border-b-red-400' : ''} read-only:border-b-darkblue read-only:opacity-75 read-only:focus:border-b-darkblue resize-y`}
    name={name} id={name} value={value} onChange={(e) => handleChange(e)} placeholder={`${placeholder ?? `Enter your ${name}`}`} readOnly={readOnly} rows="5"></textarea>
  )
}

export default Textarea