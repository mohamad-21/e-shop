import Modal from "./Modal/Modal"
import ModalButtons from "./Modal/ModalButtons"
import { FilledButton } from "./Modal/ModalButton"
import ModalTitle from "./Modal/ModalTitle"

function SuccessAlert({open, setOpen, children}) {

  return (
    <>
      {open && (
        <Modal close={!open}>
          <ModalTitle>{children}</ModalTitle>
          <ModalButtons>
            <FilledButton onClick={() => setOpen(false)}>Ok</FilledButton>
          </ModalButtons>
        </Modal>
      )}
    </>
  )
}

export default SuccessAlert