import { useState } from 'react';
import './Home.css'
import NavBar from '../../components/NavBar/NavBar';

const Home = () => {

    const [openTicketModal, setOpenTicketModal] = useState(false);
    const [ticketFormData, setTicketFormData]= useState({
        date: "",
        description:""
    })

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setTicketFormData((prev) => ({
            ...prev, [name]: value
        }))
    }

    const handleNewTicket = async ()  => {
        localStorage.setItem('Ticket', "true");
        setOpenTicketModal(true);
    }

    return (
        <>
            <NavBar/>
            <section className='homeContainer'>
                <div className='headerHomeSection'>
                    <button onClick={handleNewTicket}>Novo Chamado</button>
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
                    <div className='ticketDetails'>
                        <input type="date" placeholder='Data' name='date' value={ticketFormData.date} onChange={handleChange} />
                        <input type="text" placeholder='description' name='description' value={ticketFormData.description} onChange={handleChange} />
                    </div>
                    <button>Confirmar</button>
                    <button onClick={}>Cancelar</button>
                </div>
                </>
            )}
        </>
    )
}

export default Home;