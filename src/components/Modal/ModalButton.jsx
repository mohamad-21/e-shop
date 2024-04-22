function OutlinedButton({children, onClick}) {
  return (
    <button className="py-2 px-7 rounded text-darkblue border border-darkblue hover:bg-darkblue hover:text-white transition duration-200" onClick={onClick}>
      {children}
    </button>
  )
}

function FilledButton({children, onClick}) {
  return (
    <button className="py-2.5 px-7 rounded bg-darkblue text-white hover:opacity-75 transition duration-200" onClick={onClick}>
      {children}
    </button>
  )
}

export { FilledButton, OutlinedButton }