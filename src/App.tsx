import './App.css'
import NavBar from './components/NavBar/NavBar'

function App() {

  return (
    <>
      <section className='container'>
        <NavBar/>
        <section className='container'>
          <div className='loginForm'>
            <form >
              <h1>Login</h1>
              <input type="text" name='user' placeholder='Usuário'/>
              <input type="password" placeholder='Senha'/>
              <div className='buttonDivisor'>
                <button>Entrar</button>
              </div>
            </form>
          </div>
        </section>
      </section>

    </>
  )
}

export default App
