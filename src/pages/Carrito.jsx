import { useContext,useState,useEffect } from "react";
//Css
import "../styles/Carrito.css"

//SweetAlert
import Swal from 'sweetalert2'        

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

    //Manejador del botón finalizar compra
    function handleFinalizarCompra(){
        //Sólo se puede comprar si hay algo en el carrito !
        if(contenidoCarrito.length >0){
            //Disparar sweetAlert
            Swal.fire({
                title: "Estás listo para finalizar tu compra?",
                text: `Total a pagar $ ${totalCarrito}`,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Pagar",
                denyButtonText: `Volver al carrito`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire("Muchas gracias por tu compra !", "", "success");
            //El carro se vacía acá
                    vaciarCarrito()
                } else if (result.isDenied) {
                    Swal.fire("Volvés al carrito", "", "info");
                }
            });
        }else{
            Swal.fire({
                title: "Tu carrito está vacío",
                text: "Por qué no eliges algunos productos?",
                icon: "info"
                });
        }
        
    }

    //Manejador del botón de vaciar carrito
    function handleVaciarCarrito(){
        if(contenidoCarrito.length >0){
            //Preguntar con sweetAlert?
            Swal.fire({
                icon: "question",
                title: "Estas seguro que quieres vaciar el carrito?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Vaciar el carrito",
                denyButtonText: `No vaciar el carrito`
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Tu carrito ha sido vaciado", "", "success");
                //Acá se vacía el carrito
                vaciarCarrito()
            } else if (result.isDenied) {
                Swal.fire("Volvés al carrito", "", "info");
            }
            });
        }else{
            Swal.fire({
                title: "Carrito vacío",
                text: "No puedes vaciar algo que ya está vacío ;)",
                icon: "info"
            });
        }  
    }

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
                    <p>Total $ <span>{totalCarrito}</span></p>
                    <button 
                        onClick={handleFinalizarCompra}>
                            Finalizar compra <span className="icono-btn-carrito icono-btn__comprar"><FaCircleCheck /></span>
                    </button>
                    <button 
                        onClick={handleVaciarCarrito}>Vaciar carrito <span className="icono-btn-carrito icono-btn__cancelar"><FaCircleXmark/></span>
                    </button>
            </section>

            
        </main>
    )
}

export default Carrito;