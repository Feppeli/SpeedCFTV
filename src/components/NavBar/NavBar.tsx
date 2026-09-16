import HomeIcon from '../../assets/casa.png'
import './NavBar.css'

const NavBar = () => {

    const handleClickMenu = (e: any) => {
        e.preventDefault()
        alert("Menu em desenvolvimento :)")
    }

    return (
        <>
        <nav>
            <div>
                <h1>SpeedCFTV</h1>
            </div>
            <div>
                <button onClick={handleClickMenu}>
                    <img src={HomeIcon} alt="Menu" />
                </button>
            </div>
        </nav>

        <section className='menu'>
            
        </section>
        </>
    )
}

export default NavBar;