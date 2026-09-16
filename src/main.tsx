import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.tsx'

// PAGES
import Home from './pages/home/home.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
