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
    const [editModal, setOpenEditModal] = useState(false)
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

        if (name === "startImage" || name === "endImage") {
            // Remore tudo que não for número
            let onlyNums = value.replace(/\D/g, "")

            // validação de horas
            if (onlyNums.length > 4) {
                onlyNums = onlyNums.slice(0, 4)
            }
            if (onlyNums.length >= 2) {
                let hours = parseInt(onlyNums.slice(0, 2), 10)
                if (hours > 23) {
                    hours = 23
                }

                onlyNums = hours.toString().padStart(2, "0") + onlyNums.slice(2)
            }

            // validação minutos
            if (onlyNums.length === 4) {
                let minutes = parseInt(onlyNums.slice(2, 4), 10);
                if (minutes > 59) {
                    minutes = 59
                }

                onlyNums = onlyNums.slice(0, 2) + minutes.toString().padStart(2, "0");
            }

            if (onlyNums.length > 2) {
                newValue = `${onlyNums.slice(0, 2)}:${onlyNums.slice(2, 5)}`;
            } else {
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
        if (ticketFormData.date == "") {
            alert("O campo: Data está em branco, Corrija e envie novamente")
        }
        else if (ticketFormData.nameCamera == "") {
            alert("O campo: Nome da Câmera está em branco, Corrija e envie novamente")
        }
        else if (ticketFormData.startImage == "") {
            alert("O campo: Hora Inicial está em branco, Corrija e envie novamente")
        }
        else if (ticketFormData.endImage == "") {
            alert("O campo: Hora final está em branco, Corrija e envie novamente")
        }
        else {

            let startHour = parseInt(ticketFormData.startImage.slice(0, 2));
            let endHour = parseInt(ticketFormData.endImage.slice(0, 2));
            let startMinute = parseInt(ticketFormData.startImage.slice(3, 5))
            let endMinute = parseInt(ticketFormData.endImage.slice(3, 5))

            if (startHour == endHour && startMinute >= endMinute || startHour > endHour) {
                alert("A hora inicial deve anteceder a hora final")
            }
            else {
                setImagesDB((prevImages) => {
                    const newImageID = prevImages.length > 0 ? Math.max(...prevImages.map((img) => img.id)) + 1 : 1;

                    setTicketFormData((prev) => ({
                        ...prev,
                        id: newImageID,
                    }))

                    const newImageData = {
                        ...ticketFormData,
                        id: newImageID,
                    }

                    const updatedImages = [...prevImages, newImageData]

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
        }
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

    const handleDeleteImage = (id: number) => {
        setImagesDB((prevImages) => prevImages.filter((image) => image.id !== id));
    }

    const handleEditeImage = (e: React.MouseEvent, id: any) => {
        e.preventDefault();
        if (editModal == false) {
            setOpenEditModal(true)
            localStorage.setItem('editIdImg', id)

        }
        else {
            // VALIDAÇÃO DE CAMPOS VAZIOS
            if (ticketFormData.date == "") {
                alert("O campo: Data está em branco, Corrija e envie novamente")
            }
            else if (ticketFormData.nameCamera == "") {
                alert("O campo: Nome da Câmera está em branco, Corrija e envie novamente")
            }
            else if (ticketFormData.startImage == "") {
                alert("O campo: Hora Inicial está em branco, Corrija e envie novamente")
            }
            else if (ticketFormData.endImage == "") {
                alert("O campo: Hora final está em branco, Corrija e envie novamente")
            }
            else {

                let startHour = parseInt(ticketFormData.startImage.slice(0, 2));
                let endHour = parseInt(ticketFormData.endImage.slice(0, 2));
                let startMinute = parseInt(ticketFormData.startImage.slice(3, 5))
                let endMinute = parseInt(ticketFormData.endImage.slice(3, 5))

                if (startHour == endHour && startMinute >= endMinute || startHour > endHour) {
                    alert("A hora inicial deve anteceder a hora final")
                }


                setImagesDB((prevImagesDB) => {
                    return prevImagesDB.map(image => image.id == parseInt(id) ? { ...image, ...ticketFormData, id: id } : image)
                })

                setOpenEditModal(false)
                setTicketFormData({
                    id: 0,
                    date: "",
                    description: "",
                    startImage: "",
                    endImage: "",
                    nameCamera: ""
                })
            }
        }
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
                                        <button onClick={(e) => handleEditeImage(e, img.id)}>Editar</button>
                                        <button onClick={() => handleDeleteImage(img.id)}>Excluir</button>
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

            {editModal && (
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


                            <button className='submitButton' onClick={(e) => handleEditeImage(e, localStorage.getItem('editIdImg'))}>Confirmar</button>
                            <button className='exitButton' onClick={() => setOpenEditModal(false)}>Cancelar</button>
                        </div>

                    </div>
                </>
            )}

        </>
    )
}

export default Home;