URL_BURGUERS = "https://6ab2551d5b9b60f39d348f42.mockapi.io/hamburguesas";

async function get(url)
{
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    return (datos);
}

async function cargarProductos()
{
    const hamburguesas = await get(URL_BURGUERS);
	console.log(hamburguesas);
    const sectionProducts = document.getElementById("products");

	for (let i = 0; i < hamburguesas.length; i++)
	{
		const product = crearTarjeta(hamburguesas[i]);
		sectionProducts.appendChild(product);
	}
}

function crearTarjeta(burguer)
{
	const card = document.createElement("div");
	card.classList.add("card");
	card.setAttribute("draggable", "true");
	card.setAttribute("id", burguer.id);

	const imagen = document.createElement("img");
	imagen.classList.add("product__image");
	imagen.setAttribute("src", burguer.imagen);
	imagen.setAttribute("alt", burguer.nombre);
	card.appendChild(imagen);

	const nombre = document.createElement("h3");
	nombre.classList.add("product__name");
	nombre.textContent = burguer.nombre;
	card.appendChild(nombre);

	const descripcion = document.createElement("p");
	descripcion.classList.add("product__description");
	descripcion.textContent = burguer.descripcion;
	card.appendChild(descripcion);

	const precio = document.createElement("p");
	precio.classList.add("product__price");
	precio.textContent = burguer.precio + " €";
	card.appendChild(precio);
	return card;
}

cargarProductos();
