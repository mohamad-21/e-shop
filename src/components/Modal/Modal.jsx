import { useEffect, useState } from "react"
import ModalBody from "./ModalBody"

function Modal({children, close = false, mode=''}) {

  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    setShowModal(!close);
  }, [close]);

  return (
    <div className={`fixed inset-0 bg-black/60 text-white items-center justify-center z-20 px-5 ${showModal ? 'flex' : 'hidden'}`}>
      <ModalBody mode={mode}>
        {children}
      </ModalBody>
    </div>
  )
}

export default Modal