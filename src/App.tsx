import { useState } from 'react';
import './App.css'
import NavBar from './components/NavBar/NavBar'
import { useNavigate } from 'react-router';

function App() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user: "",
    password: ""
  })

  const userEnv = import.meta.env.VITE_USER
  const passwordEnv = import.meta.env.VITE_PASSWORD

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}))

  }
  
  const handleSubmit = (e:any) => {
    e.preventDefault()  
    if(formData.user === userEnv && formData.password === passwordEnv){
      navigate('/home')
    }
  }

  return (
    <>
      <section className='container'>
        <NavBar/>
        <section className='container'>
          <div className='loginForm'>
            <form onSubmit={handleSubmit}>
              <h1>Login</h1>
              <input type="text" name='user' id='user' value={formData.user} onChange={handleChange} placeholder='Usuário'/>
              <input type="password" name='password' id='password' value={formData.password} onChange={handleChange} placeholder='Senha'/>
              <div className='buttonDivisor'>
                <button type='submit'>Entrar</button>
              </div>
            </form>
          </div>
        </section>
      </section>

    </>
  )
}

export default App
