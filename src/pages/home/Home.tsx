import React, { useState, type HtmlHTMLAttributes } from 'react';
import './Home.css'
import NavBar from '../../components/NavBar/NavBar';

const Home = () => {

    const [openTicketModal, setOpenTicketModal] = useState(false);
    const [ticketFormData, setTicketFormData]= useState({
        date: "",
        description:"",
        startImage:"",
        endImage:"",
        nameCamera:""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setTicketFormData((prev) => ({
            ...prev, [name]: value
        }))
    }

    const handleNewTicket = async ()  => {
        localStorage.setItem('Ticket', "true");
        setOpenTicketModal(true);
    }

    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setOpenTicketModal(false)
    }

    const handleAddImage = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()

        let data = JSON.stringify(ticketFormData)

        if(ticketFormData.nameCamera == ""){
            alert("O campo: Nome da Câmera está em branco, Corrija e envie novamente")
        }
        if(ticketFormData.date == ""){
            alert("O campo: Nome da Câmera está em branco, Corrija e envie novamente")
        }

        if(ticketFormData.startImage == ""){
            alert("O campo: Hora Inicial está em branco, Corrija e envie novamente")
        }
        if(ticketFormData.endImage == ""){
            alert("O campo: Hora final está em branco, Corrija e envie novamente")
        }

        let prevData = localStorage.getItem("Relatorio")

        if(prevData){
            let data = `${JSON.stringify(prevData)}`
            

            console.log(data)
        }else{
            localStorage.setItem("Relatorio", data)
        }
    }
 
    return (
        <>
            <NavBar/>
            <section className='homeContainer'>
                <div className='headerHomeSection'>
                    <button onClick={handleNewTicket}>Novo Relatório</button>
                    <button>Adicionar imagem</button>
                </div>
                <div>
                    <div></div>
                    <div></div>
                </div>
            </section>


            {openTicketModal && (
                <>
                <div className='createTicket'>
                    <div className='ticketModal'>
                        <h2>Adicione Imagem ao relatório</h2>
                        <input type="date" className='dateInput' placeholder='Data' name='date' value={ticketFormData.date} onChange={handleChange} />

                        <input type="text" className='nameCameraInput' placeholder='nameCamera' name='nameCamera' value={ticketFormData.nameCamera} onChange={handleChange} />

                        <div className='timeInputContainer'>
                            <input type="text" className='startTimeInput' placeholder='Hora início' name='startImage' value={ticketFormData.startImage} onChange={handleChange} />

                            <input type="text" className='endTimeInput' placeholder='Hora Fim' name='endImage' value={ticketFormData.endImage} onChange={handleChange} />

                        </div>
                        <p>Descrição:</p>
                        <input type="text" className="descriptionInput" placeholder='Digite aqui a descrição da imagem' name='description' value={ticketFormData.description} onChange={handleChange} />


                        <button className='submitButton' onClick={handleAddImage}>Confirmar</button>
                        <button className='exitButton' onClick={handleClose}>Cancelar</button>
                    </div>

                </div>
                </>
            )}
        </>
    )
}

export default Home;