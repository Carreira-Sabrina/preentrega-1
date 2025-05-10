import { Routes, Route } from 'react-router-dom'

//Css
import "./App.css"
//Contexto
import { ProveedorContextoCarrito } from './context/ContextoCarrito'

//Componentes
import Bento from './components/Bento'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

//Paginas
import Productos from './pages/Productos'
import Inicio from './pages/Inicio'
import Carrito from './pages/Carrito'
import PaginaProducto from './pages/PaginaProducto'


function App() {
  
  return (
    <>
      <ProveedorContextoCarrito>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Inicio/>}/>
            <Route path='/productos' element={<Productos/>}/>
            <Route path='/productos/:id' element={<PaginaProducto/>}/>
            <Route path='/carrito' element={<Carrito/>}/>
        </Routes>
        <Footer />
      </ProveedorContextoCarrito>
    </>
  )
}

export default App
