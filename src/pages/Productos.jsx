import { useState, useEffect } from "react";
//Css
import "../styles/Productos.css"

//Componentes
import TarjetaProducto from "../components/TarjetaProducto";
import Cargando from "../components/Cargando";
import Error from "../components/Error";

function Productos(){
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    

    useEffect(()=>{

        async function cargarProductosApi(){
            try {
                const API_URL = "https://fakestoreapi.com/products"

                const respuesta = await fetch(API_URL);
                const productosApi = await respuesta.json()
                setProductos(productosApi);
                setCargando(false)
            } catch (error) {
                setCargando(false)
                console.log(error)
                setError(error)
            }
        }
        cargarProductosApi()
        
    },[])

    //Estado de carga
    if(cargando){
        return(
            <>
                <Cargando/>
            </>
        )
    }

    //Estado de error
    if(error){
        return(
            <>
                <Error/>
            </>
        )
    }


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