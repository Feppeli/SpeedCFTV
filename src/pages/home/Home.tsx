import React, { useState} from 'react';
import './Home.css'
import NavBar from '../../components/NavBar/NavBar';


const Home = () => {

    const [openTicketModal, setOpenTicketModal] = useState(false);
    const [ticketFormData, setTicketFormData]= useState({
        id:0,
        date: "",
        description:"",
        startImage:"",
        endImage:"",
        nameCamera:""
    })
    const [imagesDB, setImagesDB] = useState<Array<object>>([]);

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

        // VALIDAÇÃO DE CAMPOS VAZIOS
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

        let data = localStorage.getItem('images')
        if(data){
            setImagesDB(JSON.parse(data))
        }

        setImagesDB((prevImages) => {
            const newImageID = prevImages.length + 1;

            setTicketFormData((prev) => ({
                ...prev,
                id: newImageID,
            }))

            const newImageData = {
                ...ticketFormData,
                id: newImageID,
            }

            const updatedImages = [...prevImages, newImageData]
            console.log("Array atualizado:", updatedImages);

            return updatedImages
        })

        setTicketFormData({
            id:0,
            date: "",
            description:"",
            startImage:"",
            endImage:"",
            nameCamera:""
        })

        setOpenTicketModal(false)
    }

    const handleCleanImages = (e: React.MouseEvent) => {
        e.preventDefault()

        setImagesDB([])
        localStorage.setItem('images', '')
    }
 
    return (
        <>
            <NavBar/>
            <section className='homeContainer'>
                <div className='headerHomeSection'>
                    {}
                    <button onClick={handleCleanImages}>Novo Relatório</button>
                    <button onClick={handleNewTicket}>Adicionar imagem</button>
                </div>
                <div className='mainContent'>
                    <div>
                        <h1>Relatório</h1>
                    </div>
                    <div className='imageContents'>
                        {imagesDB.map((img: any): any => {
                            return(
                            <div key={img.id} className='imageContent'>
                                <div>                                
                                    <p>ID: {img.id}</p>
                                    <p>Câmera: {img.nameCamera}</p>
                                    <p>Hora inicial: {img.startImage}</p>
                                    <p>Hora Final: {img.endImage}</p></div>
                                <div className='imageActions'>
                                    <button>Editar</button>
                                    <button>Excluir</button>
                                </div>
                            </div>
                            )
                        })}
                    </div>
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