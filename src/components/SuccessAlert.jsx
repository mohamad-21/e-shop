import Modal from "../components/Modal/Modal"
import ModalButtons from "../components/Modal/ModalButtons"
import { FilledButton } from "../components/Modal/ModalButton"
import ModalTitle from "../components/Modal/ModalTitle"

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