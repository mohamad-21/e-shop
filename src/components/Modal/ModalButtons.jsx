import React from 'react'

function ModalButtons({children}) {
  return (
    <div className="mt-16 flex items-center justify-end gap-3">
      {children}
    </div>
  )
}

export default ModalButtons