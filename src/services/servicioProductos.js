
const API_URL = "https://fakestoreapi.com/products"

export async function obtenerProductosAPI(){

    try {
        const respuesta = await fetch(API_URL);
        const productosAPI = await respuesta.json()

        return productosAPI;
    } catch (error) {
        console.log(error)
    }
}

export async function obtenerProductoAPiPorId(id) {

    try {
        const respuesta = await fetch(`${API_URL}/${id}`);
        const productoAPI = await respuesta.json()
    
        return productoAPI;

    } catch (error) {
        console.log(error)
    }
}