import { useContext } from "react";

//Css
import "../styles/Login.css"

//Contexto
import { ContextoCarrito } from "../context/ContextoCarrito";

function Login(){

    const {usuarioLoggeado, setUsuarioLoggeado} = useContext(ContextoCarrito);

    return(
        <main>
            <h1>
                Bienvenido 
                {
                    usuarioLoggeado ? " usuario, ya podés comprar en nuestra plataforma"
                                    : " invitado, necesitás iniciar sesión para acceder al carrito"
                }
            
            <section>
                <button onClick={()=>setUsuarioLoggeado(!usuarioLoggeado)}>
                    {
                        usuarioLoggeado ? "Cerrar sesión"
                                        : "Iniciar sesión"
                    }
                </button>
            </section>

            </h1>
        </main>
        
    )
}

export default Login;