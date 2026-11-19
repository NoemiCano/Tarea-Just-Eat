URL_BURGUERS = "https://6ab2551d5b9b60f39d348f42.mockapi.io/hamburguesas";

async function get(url)
{
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    return (datos);
}

async function cargarProductos()
{
    const datos = await get(URL_BURGUERS);
    console.log(datos);

    const products = document.getElementById("products");
}

async function crearTarjetas()
{

}

cargarProductos();
