import './WrongPopUp.css'

interface popUp {
  popUpMessage: string;
  setOpenPopUpModal: React.Dispatch<React.SetStateAction<boolean>>;
  openPopUpModal: boolean;
}

const WrongPopUp = ({ popUpMessage, setOpenPopUpModal, openPopUpModal }: popUp) => {

  const handleClosePopUpModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpenPopUpModal(true)

    console.log(openPopUpModal)
  }
  return (
    <div className="container">
      <div className="popUp">
        <h1>Atenção!</h1>
        <p><strong>Erro: </strong>{popUpMessage}</p>
        <button onClick={(e) => handleClosePopUpModal(e)}>Fechar</button>
      </div>
    </div>
  )
}

export default WrongPopUp;