import { useContext } from "react";
import { Link } from "react-router-dom";
//Css
import "../styles/TarjetaProducto.css"

//Contexto 
import { ContextoCarrito } from "../context/ContextoCarrito";

//React icons
import { FaCartPlus } from "react-icons/fa6"; // <FaCartPlus />
import { CgWebsite } from "react-icons/cg"; //<CgWebsite /> para boton de ver detalle (va a pagina dinamica)


function TarjetaProducto({producto}){

    //Functiones que vinen del contexto
    const {agregarProductoAlCarrito} = useContext(ContextoCarrito)

    const {id, title: titulo, price:precio, description: descripcion, category:categoria, image: urlImagen} = producto;


    return(
        <article className="tarjeta-producto">
            <div className="tarjeta-producto__img">
                <img src={urlImagen} alt={titulo} />
            </div>
            <div className="tarjeta-producto__datos">
                <h3>{titulo}</h3>
                <p>${precio}</p>
                <div className="tarjeta-producto__botones">
                    {/* botones agregar y eliminar al carrito */}
                    <button className="btn-tarjeta-producto btn-agregar-carrito" 
                            onClick={()=>agregarProductoAlCarrito(producto)}>
                                Agregar al carrito <span><FaCartPlus /></span>
                    </button>

                    <Link to={`/productos/${id}`} className="btn-tarjeta-producto btn-pagina-dinamica">
                        Ver detalle <span><CgWebsite /></span>
                    </Link>

                </div>
            </div>
            

        </article>
    ) 
}

export default TarjetaProducto;