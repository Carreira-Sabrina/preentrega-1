import { useContext,useState,useEffect } from "react";
//Css
import "../styles/Carrito.css"

//Contexto 
import { ContextoCarrito } from "../context/ContextoCarrito";

//Componentes
import ItemCarrito from "../components/ItemCarrito";

//React icons
import { FaCircleCheck } from "react-icons/fa6"; //<FaCircleCheck />
import { FaCircleXmark } from "react-icons/fa6"; //<FaCircleXmark />


function Carrito(){

    //Functiones y estado que vinen del contexto ME DOY CUENTA QUE LO UNICO QUE ESTOY USANDO ES contenidoCarrito 🦜🦜🦜🦜🦜
    const { contenidoCarrito,
            agregarProductoAlCarrito,
            aumentarCantidadProductoCarrito,
            disminuirCantidadProductoCarrito,
            eliminarProductoDelCarrito,
            vaciarCarrito} = useContext(ContextoCarrito)
    
    //Funcion auxiliar para calcular el total del carrito
    function calcularTotalCarrito(){
        const total = contenidoCarrito.reduce((suma, item)=>{
            return suma + (item.cantidad*item.price)
        },0)
        return total.toFixed(2)
    }
    //El total del carrito es reactivo, depende de la cantidad de productos que se van agregando
    const [totalCarrito, setTotalCarrito] = useState(calcularTotalCarrito)

    //Disparar el cambio de total en carrito
    useEffect(()=>{
        setTotalCarrito(calcularTotalCarrito)
    },[contenidoCarrito])

    return(
        <main className="contenedor_carrito">

            <section className="display-productos-carrito">
            <h1>Tu carrito</h1>
                {
                    contenidoCarrito.length > 0 ?
                    contenidoCarrito.map((item)=>(
                    <ItemCarrito key={item.id} producto={item} />
                    )   )
                : <p>Tu carrito esta vacio</p>
            }
            </section>
            <section className="display-checkout-carrito">
                    <h3>Resumen de tu compra</h3>
                    <p>Total <span>{totalCarrito}</span></p>
                    <button>Finalizar compra <span><FaCircleCheck /></span></button>
                    <button>Vaciar carrito <span></span><FaCircleXmark /></button>
            </section>

            
        </main>
    )
}

export default Carrito;