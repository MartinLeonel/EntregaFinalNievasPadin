let cart = []; //objeto carrito vacio
const cartDropdown = document.getElementById("cart-dropdown");

// -----GENERAR TARJETAS DE PRODUCTOS-----

fetch('./stock/stock.json')            //Carga el archivo de stock .JSON utilizando fetch()
    .then(response => response.json())
    .then(data => displayProducts(data.iphones))
    .catch(error => console.log('Error al cargar el archivo JSON'));


function displayProducts(iphones) {
    const container = document.getElementById('main-phones');

    iphones.forEach(iphone => {  //forEach para recorrer el arrray de stock

        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = ` <div class="col-12 col-sm6 col-md4">
                            <div class="card h-100">
                                <img src="${iphone.image}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${iphone.model}</h5>
                                    <p class="card-text">Color: ${iphone.color}</p>
                                    <p class="card-text">Estado de la bateria % ${iphone.batery}</p>
                                    <p class="card-text">Precio: $ ${iphone.priceUsd}</p>
                                </div>
                                <button type="button" id=${iphone.id} class="btn btn-primary">+</button>
                            </div>
                        </div>    `;

        container.appendChild(div);

        const addToCardButton = div.querySelector(`button[id="${iphone.id}"]`); // Utilizo query selector para seleccionar el boton y le agregamos la funcion addToCard
        addToCardButton.addEventListener('click', () => addToCard(iphone));
    });
}

function addToCard(iphone) {
    const existingIphone = cart.find((item) => item.id === iphone.id);

    if (existingIphone) {
        Swal.fire({
            icon: 'error',
            title: 'Producto ya en el carrito',
            text: 'El producto ya se encuentra en el carrito',
            position: 'top-end',
            timer: 1000,
            showConfirmButton: false,
        });
    } else {
        cart.push(iphone);
        updateCart();
        Swal.fire({
            icon: 'success',
            title: 'Producto Agregado',
            text: 'El producto se agrego al carrito',
            position: 'top-end',
            timer: 1000,
            showConfirmButton: false,
        });
    }
}

function toggleCartDropdown() {
    const cartDropdown = document.getElementById('cart-dropdown');
    cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
}


const cartButton = document.getElementById('cart-button'); // Agregar un listener al botón del carrito
cartButton.addEventListener('click', toggleCartDropdown);


function updateCart() {
    const cartDropdown = document.getElementById('cart-dropdown');
    cartDropdown.innerHTML = '';

    let totalPrice = 0;

    cart.forEach((iphone, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
        <img src="${iphone.image}" alt="${iphone.model}" class="cart-item-img">
        <div class="cart-item-info">
          <p>${iphone.model}</p>
          <p>$${iphone.priceUsd}</p>
        </div>
      `;
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-item-btn');
        removeButton.innerText = 'X';
        removeButton.addEventListener('click', () => removeFromCart(index));
        cartItem.appendChild(removeButton);
        cartDropdown.appendChild(cartItem);
        totalPrice += iphone.priceUsd;
    });

    const totalContainer = document.createElement('div');
    totalContainer.classList.add('cart-total');
    totalContainer.innerHTML = `
      <p>Total:</p>
      <p>$${totalPrice}</p>
    `;

    cartDropdown.appendChild(totalContainer);

    const buyButton = document.createElement('button');
    buyButton.id = "buy-button";
    buyButton.innerText = "Comprar";
    buyButton.addEventListener("click", processPurchase);
    cartDropdown.appendChild(buyButton);

}


cartButton.addEventListener('click', () => {
    cartDropdown.classList.toggle('hidden');
});


function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}


function processPurchase() {
    window.location.href = 'payment.html'; //Redirige a el formulario
}

const purchaseButton = document.getElementById("purchase-button");
if (purchaseButton) {
    purchaseButton.addEventListener("click", processPurchase);
}
