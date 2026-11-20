URL_BURGUERS = "https://6ab2551d5b9b60f39d348f42.mockapi.io/hamburguesas";

async function get(url)
{
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    return (datos);
}

async function loadProducts()
{
    const hamburguesas = await get(URL_BURGUERS);
    const sectionProducts = document.getElementById("products");

	for (let i = 0; i < hamburguesas.length; i++)
	{
		const product = createCard(hamburguesas[i]);
		sectionProducts.appendChild(product);
	}
}

function createCard(burguer)
{
	const card = document.createElement("div");
	card.classList.add("card");
	card.setAttribute("draggable", "true");
	card.setAttribute("id", burguer.id);

	const image = document.createElement("img");
	image.classList.add("product__image");
	image.setAttribute("src", burguer.imagen);
	image.setAttribute("alt", burguer.nombre);
	card.appendChild(image);

	const name = document.createElement("h3");
	name.classList.add("product__name");
	name.textContent = burguer.nombre;
	card.appendChild(name);

	const descripcion = document.createElement("p");
	descripcion.classList.add("product__description");
	descripcion.textContent = burguer.descripcion;
	card.appendChild(descripcion);

	const price = document.createElement("p");
	price.classList.add("product__price");
	price.textContent = burguer.precio + " €";
	card.appendChild(price);

	card.addEventListener("dragstart", (event) =>
	{
		event.dataTransfer.setData("id", event.currentTarget.id);
	});

	return card;
}

let carrito = [];

function cart(carrito)
{
	const sectionCart = document.getElementById("cart");

	const productsBuy = document.createElement("div");
	productsBuy.classList.add("products__buy");
	sectionCart.appendChild(productsBuy);

	const productsDelete = document.createElement("div");
	productsDelete.classList.add("products__delete");
	sectionCart.appendChild(productsDelete);

	const titleBuy = document.createElement("h2");
	titleBuy.classList.add("title__buy");
	titleBuy.textContent = "Carrito de la compra";
	productsBuy.appendChild(titleBuy);

	const titleDelete = document.createElement("h3");
	titleDelete.classList.add("title__delete");
	titleDelete.textContent = "Arrastra un producto aquí para eliminarlo";
	productsDelete.appendChild(titleDelete);

	if (carrito.length === 0)
	{
		const emptyCart = document.createElement("p");
		emptyCart.classList.add("empty__cart");
		emptyCart.textContent = "El carrito está vacío";
		productsBuy.appendChild(emptyCart);
	}
	else
	{
		for (let i = 0; i < carrito.length; i++)
		{
			const cartItem = document.createElement("div");
			cartItem.classList.add("cart__item");
			cartItem.setAttribute("draggable", "true");
			cartItem.setAttribute("id", carrito[i].id);
			productsBuy.appendChild(cartItem);
		}
	}
}

loadProducts();
cart(carrito);

const buyProduct = document.querySelector(".products__buy");

buyProduct.addEventListener("dragover", (event) =>
{
	event.preventDefault();
});

buyProduct.addEventListener("drop", (event) =>
{
	event.preventDefault();

    const id = event.dataTransfer.getData("id");
    const original = document.getElementById(id);

    if (!original) return;

    const row = document.createElement("div");
    row.classList.add("cart__item");
    row.dataset.productId = id;
    row.draggable = true;

    const image = original.querySelector(".product__image").cloneNode(true);
    image.className = "cart__image";

    const name = original.querySelector(".product__name").cloneNode(true);
    name.className = "cart__name";

    const price = original.querySelector(".product__price").cloneNode(true);
    price.className = "cart__price";

    row.appendChild(image);
    row.appendChild(name);
    row.appendChild(price);

    row.addEventListener("dragstart", (evento) => {
        evento.dataTransfer.setData(
            "id",
            evento.currentTarget.dataset.productId
        );
    });

    const emptyMessage = buyProduct.querySelector(".empty__cart");
    if (emptyMessage) {
        emptyMessage.remove();
    }

    buyProduct.appendChild(row);
    carrito.push({ id: id });
    localStorage.setItem("carrito", JSON.stringify(carrito));
});

const deleteProduct = document.querySelector(".products__delete");

deleteProduct.addEventListener("dragover", (event) =>
{
	event.preventDefault();
});

deleteProduct.addEventListener("drop", (event) => {
    event.preventDefault();

    const id = event.dataTransfer.getData("id");

    const row = Array.from(
        buyProduct.querySelectorAll(".cart__item")
    ).find((item) => item.dataset.productId === id);

    if (!row) return;

    row.remove();

    carrito = carrito.filter(
        (producto) => String(producto.id) !== id
    );

    localStorage.setItem("carrito", JSON.stringify(carrito));

    if (carrito.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.classList.add("empty__cart");
        emptyMessage.textContent = "El carrito está vacío";
        buyProduct.appendChild(emptyMessage);
    }
});
