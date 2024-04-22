function Submit({value, disabled}) {
  return (
    <button className="bg-lightblue py-3 rounded-md text-white uppercase font-medium hover:opacity-75 focus:ring-2 duration-200 disabled:opacity-50" disabled={disabled}>{value}</button>
  )
}

export default Submit