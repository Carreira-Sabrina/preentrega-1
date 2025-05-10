import { useState, useEffect } from "react";
//Css
import "../styles/Productos.css"
//Servicios
import { obtenerProductosAPI } from "../services/servicioProductos";
//Componentes
import TarjetaProducto from "../components/TarjetaProducto";


function Productos(){
    const [productos, setProductos] = useState([])

    

    useEffect(()=>{

        async function cargarProductosApi(){
            const productosApi = await obtenerProductosAPI();
            setProductos(productosApi);
        }
        cargarProductosApi()
        
    },[])


    return(
        <main>

            <section className="grilla-productos">
                {/* Los productos se generan aqui */}

                {
                    productos.map((producto)=>(
                        <TarjetaProducto key={producto.id} producto={producto}/>
                    ))
                }
            </section>

        </main>
    )

}

export default Productos;