import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
//Css
import './index.css'
//Componentes
import App from './App.jsx'
//Contexto
import { ProveedorContextoCarrito } from './context/ContextoCarrito.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <ProveedorContextoCarrito>
            <App />
        </ProveedorContextoCarrito>
    </BrowserRouter>
    
  </StrictMode>,
)
