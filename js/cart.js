let iconCart = document.querySelector('header nav .icon-cart');
let main = document.querySelector('main');

document.body.onload = function() {
    
    let div =  document.createElement("div");
    div.classList.add("cartTab");
    div.innerHTML = `
        <h1>Shopping Cart</h1>            
        <div id="carrito-vacio" class="carrito-vacio">
            <div class="img-empty-car">
                <img src="../images/assets/cart-empty.png" alt="Carrito de compras vacio">
            </div>
            <div class="text-empty-car">
                <h3 class="text-special">Tu carrito está vacío </h3>
                <p>Descubrí nuestros libros y sumergete en el increible mundo de la literatura.</p>
                <a href="./store.html" class="btn btn-modal">Descubrir libros</a>
            </div>
        </div>
        <div id="carrito-comprado" class="carrito-comprado disabled">
            <div class="img-full-car">
                <img src="../images/assets/cart-full.png" alt="Carrito de compras lleno">
            </div>
            <div class="text-full-car">
                <h3 class="text-special">¡ Gracias por tu compra !</h3> 
                <h2 class="text-special">Mundo Literario</h2>
            </div>        
        </div>
        <div class="listCart">
        </div>
        <div class="cart-btn">
            <button class="close btn">CLOSE<i class="fa-solid fa-xmark"></i></button>
            <div id="comprar-total" class="carrito-acciones-der disabled">
                <div class="carrito-acciones-total">
                    <small>Total:</small>
                    <p id="total"></p>       
                </div>
                <button id="btn-comprar" class="carrito-acciones-comprar btn ">comprar</button>
            </div> 
        </div>

    `;

    let main = document.querySelector('main');
    main.appendChild(div);

    if (window.location.pathname.includes("index.html") || window.location.pathname === "/" ) {
        console.log(window.location.pathname === "/" )
        const btnAlCatalogo = document.getElementById("btn-alCatalogo");
        btnAlCatalogo.href =" ./pages/store.html";
        const imgCartEmpty = document.querySelector(".img-empty-car img");
        imgCartEmpty.src = " ./images/assets/cart-empty.png";
        const imgCartFull = document.querySelector(".img-full-car img");
        imgCartEmpty.src = " ./images/assets/cart-full.png";
    }
    
    let closeBtn = document.querySelector('.cartTab .close');
    
    // abre y cierra el carrito
    iconCart.addEventListener('click', () => {
        main.classList.toggle('activeTabCart');
    })
    closeBtn.addEventListener('click', () => {
        main.classList.toggle('activeTabCart');
        location.reload();
    })

    const btnComprar = document.getElementById("btn-comprar");

    initApp();
    
    btnComprar.addEventListener("click", comprarCarrito);
}



// modifica la cantidad pedida y si llega a cero, elimina el item
const setProductInCart = (idProduct, quantity, position) => {
    if(quantity > 0){
        if(position < 0){
            cart[position].carrito.cantidad += quantity;
        }else{
            cart[position].carrito.cantidad = quantity;
        }
    }else{
        cart.splice(position, 1);
    } //else usa splice para sacar del cart el producto si llega a 0
    localStorage.setItem('productos-en-carrito', JSON.stringify(cart)); // guarda local el carrito de compras const initApp abajo 
    refreshCartHTML();
}

// enlista todos los libros del carrito
const refreshCartHTML = () => {
    let containerComprarTotal = document.getElementById("comprar-total");
    let listHTML = document.querySelector('.listCart');
    let carritoVacio = document.getElementById("carrito-vacio");
    let carritoComprado = document.getElementById("carrito-comprado");

    if (cart && cart.length > 0) {
        carritoVacio.style.display = "none";
        listHTML.classList.remove("disabled");
        containerComprarTotal.classList.remove("disabled");

        listHTML.innerHTML = "";
        cart.forEach(item => {

            const subtotal = item.precio * item.carrito.cantidad;
            item.carrito.subtotal = subtotal;
            let position = cart.findIndex((value) => value.id == item.id);
            let info = cart[position]; // traigo position e info de tabla products y luego la pongo en el div

            let newITem = document.createElement('div');
            newITem.classList.add('item');
            newITem.innerHTML =
                        `
                        <div class="image">
                            <img src="${info.imagen}" alt="${info.nombre}"/>
                        </div>
                        <div class="name">${info.nombre}</div>
                        <div class="quantity">
                            <span class="minus" data-id="${info.id}">-</span>    
                            <p>${info.carrito.cantidad}</p>    
                            <span class="plus" data-id="${info.id}">+</span>
                        </div> 
                        <div class="carrito-producto-precio">
                                    <small>Precio</small>
                                    <p>$${info.precio}</p>
                                </div>
                        <div class="totalPrice">
                        <small>Subtotal</small>
                        <p>$ ${subtotal}</p>
                        </div>
                        <button class="carrito-producto-eliminar" id="${info.id}"><i class="fa-solid fa-trash-can"></i></button>
                        `; //tabla cart solo tiene product_id y quantity, para mas info necesita buscar en tabla products
                        //info.id en div para hacer funcionar la suma y la quita de productos, va al else if de la funcion setproductincart else if(buttonClick.classList.contains('plus')){quantity++; setProductInCart(idProduct, quantity, position);} como es igual a plus pasa  a ||

            listHTML.appendChild(newITem);
        });

         
    } else {
        carritoVacio.style.display = "flex";
        listHTML.classList.add("disabled");
        containerComprarTotal.classList.add("disabled");    
        carritoComprado.classList.add("disabled");
        
    }
    actualizarBotonesEliminar();
    actualizarTotal();
}

document.addEventListener('click', (event) => {
    let buttonClick = event.target;
    let idProduct = buttonClick.dataset.id;
    let position = cart.findIndex((value) => value.id == idProduct);

    let quantity = position < 0 ? 0 : cart[position].carrito.cantidad;

    if(buttonClick.classList.contains('addCart') || buttonClick.classList.contains('plus')){
        quantity++;
        setProductInCart(idProduct, quantity, position); 
    }else if(buttonClick.classList.contains('minus')){
        quantity --;
        setProductInCart(idProduct, quantity, position);
    }
    actualizarNumerito();
})

const initApp = () => {
    if (localStorage.getItem('productos-en-carrito')) {
        cart = JSON.parse(localStorage.getItem('productos-en-carrito'));
    }
    refreshCartHTML();
}

// Accion comprar carrito
function comprarCarrito() {
    cart.length = 0;
    actualizarCarritoLS();

    document.querySelector('.listCart').classList.add("disabled");
    document.getElementById("comprar-total").classList.add("disabled");
    document.getElementById("carrito-comprado").classList.remove("disabled");
}

// Accion eliminar libro
function eliminarLibro(e) {
    const idProd = e.currentTarget.id;
    const indexProductoEliminado = cart.findIndex(libro => libro.id === idProd);
    setProductInCart(idProd,0,indexProductoEliminado);   
}

function actualizarBotonesEliminar() {
botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

botonesEliminar.forEach(boton => {
    boton.addEventListener("click", eliminarLibro);
})
};

// Accion actualizar total de la compra
function actualizarTotal() {
    let totalCompra = document.getElementById("total");

    const total = cart.reduce((acumulador, libro) => acumulador + libro.carrito.subtotal, 0);
    totalCompra.innerText = `$ ${total}`;
}

