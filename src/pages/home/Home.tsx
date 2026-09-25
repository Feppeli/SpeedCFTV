import React, { useState } from 'react';
import './Home.css'
import NavBar from '../../components/NavBar/NavBar';


interface imageItem {
    id: number,
    date: string,
    description: string,
    startImage: string;
    endImage: string;
    nameCamera: string;
}

const Home = () => {
    const [resumeModal, setResumeModal] = useState(false)
    const [openTicketModal, setOpenTicketModal] = useState(false);
    const [ticketFormData, setTicketFormData] = useState({
        id: 0,
        date: "",
        description: "",
        startImage: "",
        endImage: "",
        nameCamera: ""
    })
    const [imagesDB, setImagesDB] = useState<Array<imageItem>>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        var newValue = value

        if(name === "startImage" || name === "endImage"){
            // Remore tudo que não for número
            let onlyNums = value.replace(/\D/g, "")

            // validação de horas
            if (onlyNums.length > 4 ){
                onlyNums = onlyNums.slice(0, 4)
            }
            if( onlyNums.length >=2){
                let hours = parseInt(onlyNums.slice(0, 2), 10)
                if(hours > 23){
                    hours = 23
                }

                onlyNums = hours.toString().padStart(2, "0") + onlyNums.slice(2)
            }

            // validação minutos
            if(onlyNums.length === 4){
                let minutes = parseInt(onlyNums.slice(2, 4), 10);
                if(minutes > 59){
                    minutes = 59
                }

                onlyNums = onlyNums.slice(0,2) + minutes.toString().padStart(2, "0");
            }

            if (onlyNums.length > 2) {
                newValue = `${onlyNums.slice(0, 2)}:${onlyNums.slice(2, 5)}`;
            }else{
                newValue = onlyNums
            }
        }

        setTicketFormData((prev) => ({
            ...prev, [name]: newValue
        }))

    }



    const handleOpenTicketModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setOpenTicketModal(!openTicketModal)
    }

    const handleOpenResumeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setResumeModal(!resumeModal)
    }

    const handleAddImage = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()

        // VALIDAÇÃO DE CAMPOS VAZIOS
        if (ticketFormData.nameCamera == "") {
            alert("O campo: Nome da Câmera está em branco, Corrija e envie novamente")
        }
        if (ticketFormData.date == "") {
            alert("O campo: Nome da Câmera está em branco, Corrija e envie novamente")
        }
        if (ticketFormData.startImage == "") {
            alert("O campo: Hora Inicial está em branco, Corrija e envie novamente")
        }
        if (ticketFormData.endImage == "") {
            alert("O campo: Hora final está em branco, Corrija e envie novamente")
        }

        let data = localStorage.getItem('images')
        if (data) {
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
            id: 0,
            date: "",
            description: "",
            startImage: "",
            endImage: "",
            nameCamera: ""
        })

        setOpenTicketModal(false)
    }

    const handleCleanImages = (e: React.MouseEvent) => {
        e.preventDefault()

        setImagesDB([])
        localStorage.setItem('images', '')
    }

    const formatArrayToText = (): string => {
        if (imagesDB.length === 0) {
            return "";
        }

        return imagesDB.map((image, i) => {
            return (
                `--- Imagem: ${i + 1} ---\n` + '\n' +
                `Câmera: ${image.nameCamera} \n` +
                `Data: ${image.date} \n` +
                `Início: ${image.startImage} \n` +
                `Fim: ${image.endImage} \n` +
                `Descrição: ${image.description != "" ? image.description : "*"} \n`
            )
        }).join('\n') // une tudo com uma quebra de linha extra
    }

    const handleCopyResume = () => {
        const formattedText = imagesDB.map((item, i) => {
            return (
                `--- Imagem: ${i + 1} ---\n\n` +
                `Câmera: ${item.nameCamera}\n` +
                `Data: ${item.date}\n` +
                `Início: ${item.startImage}\n` +
                `Fim: ${item.endImage}\n` +
                `Descrição: ${item.description}`
            )
        }).join('\n\n')

        navigator.clipboard.writeText(formattedText)
            .then(() => {
                alert("Texto copiado para a área de transferência!")
            })
            .catch((error) => {
                alert("Ocorreu um erro ao copiar o texto:" + error)
            })
    }

    return (
        <>
            <NavBar />
            <section className='homeContainer'>
                <div className='headerHomeSection'>
                    <button onClick={handleCleanImages}>Novo Relatório</button>
                    <button onClick={handleOpenTicketModal}>Adicionar imagem</button>
                    <button onClick={handleOpenResumeModal}>Gerar Relatório</button>
                </div>
                <div className='mainContent'>
                    <div>
                        <h1>Relatório</h1>
                    </div>
                    <div className='imageContents'>
                        {imagesDB.map((img: any): any => {
                            return (
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

                            <input type="text" className='nameCameraInput' placeholder='Nome da câmera' name='nameCamera' value={ticketFormData.nameCamera} onChange={handleChange} />

                            <div className='timeInputContainer'>
                                <input type="text" className='startTimeInput' maxLength={5} placeholder='Hora início' name='startImage' value={ticketFormData.startImage} onChange={handleChange} />

                                <input type="text" className='endTimeInput' maxLength={5} placeholder='Hora Fim' name='endImage' value={ticketFormData.endImage} onChange={handleChange} />

                            </div>
                            <p>Descrição:</p>
                            <input type="text" className="descriptionInput" placeholder='Digite aqui a descrição da imagem' name='description' value={ticketFormData.description} onChange={handleChange} />


                            <button className='submitButton' onClick={handleAddImage}>Confirmar</button>
                            <button className='exitButton' onClick={handleOpenTicketModal}>Cancelar</button>
                        </div>

                    </div>
                </>
            )}

            {resumeModal && (
                <div className='resumeContainer'>
                    <div className='resumeContent'>
                        <h1>Histórico</h1>
                        <div className='resumePreview'>
                            <p style={{ whiteSpace: 'pre-line' }}>{formatArrayToText()}</p>
                        </div>
                        <div>
                            <button onClick={handleCopyResume}>Copiar</button>
                            <button onClick={handleOpenResumeModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Home;