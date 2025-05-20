import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

//Css
import "../styles/PaginaProducto.css"

//Contexto 
import { ContextoCarrito } from "../context/ContextoCarrito";

//React icons
import { FaCartPlus } from "react-icons/fa6";

//Componentes
import Cargando from "../components/Cargando";
import Error from "../components/Error";


//Tuve que poner el producto en un estado porque el async... bueno...

function PaginaProducto(){
    //Detalle de un producto por id
    const {id} = useParams()

    const [producto,setProducto] = useState({})
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState("")

    //Functiones que vinen del contexto
    const {contenidoCarrito,agregarProductoAlCarrito} = useContext(ContextoCarrito)

    function enviarProductoAlCarrito(producto){
        //Esta funcion es un auxiliar que localiza el producto a enviar en el contenidoCarrito
        //Si aun no está en el carrito, envía el item, si no, aumenta su cantidad
        const productoAEnviar = contenidoCarrito.find((item)=> item.id===producto.id)

        //Si el producto existe en el carrito, recupero la cantidad
        if(productoAEnviar){
            //El producto está en el carrito, ya tiene cantidad, mandarlo asi
            agregarProductoAlCarrito(productoAEnviar)
        }
        else{
            agregarProductoAlCarrito(producto)
        }
    }

    //Hay que hacer fetch  y devolver un componente producto detalle

    useEffect(()=>{
        const API_URL = "https://fakestoreapi.com/products"

        async function obtenerProductoAPiPorId(id) {      
            try {
                const respuesta = await fetch(`${API_URL}/${id}`);
                const productoAPI = await respuesta.json();
            
                setProducto(productoAPI);
                setCargando(false)
        
            } catch (error) {
                setCargando(false)
                console.log(error)
                setError(error)
            }
        }

        obtenerProductoAPiPorId(id)
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
        <main className="main">
            {
                producto && 
                <article className="contenedor-producto">

                    <div className="contenedor-producto__imagen">
                        <img src={producto.image} alt="" />
                    </div>

                    <div className="contenedor-producto__info">
                        <h2>{producto.title}</h2>

                        <p className="contenedor-producto__info-descripcion">{producto.description}</p>

                        <p>Precio: <span>${producto.price}</span></p>

                        {/*OJO ! SI AGREGO DESDE ACA NO TIENE LA CANTIDAD !  */}
                        {/*hay que llamar a una funcion que ubique al item en el carrito y si existe,*/}
                        {/*mandarlo con la cantidad*/}
                        <button className="btn-tarjeta-producto btn-agregar-carrito" 
                                onClick={()=>enviarProductoAlCarrito(producto)}>
                                Agregar al carrito <span><FaCartPlus /></span>
                        
                        </button>

                    </div>

                </article>
            }
            
        </main>
    )

}
export default PaginaProducto;