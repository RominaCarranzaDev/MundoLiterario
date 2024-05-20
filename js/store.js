const contenedorProductos = document.querySelector(".contenedor-libros");
const tituloCategoria = document.getElementById("title-categoria");
let botonesAgregar = document.querySelectorAll(".agregar-prod");

cart = localStorage.getItem("productos-en-carrito");

if (window.location.pathname.includes("store.html")){
window.addEventListener('load', function(e) {
    
    async function cargarProductosOk() {
        try {
            const response = await fetch("../json/books.json");
          
            if(response.ok) {
                const data = await response.json();
    
                if(data) {
                    libros = data;
                    cargarProductos(libros);
                    cargarParametros();
                    return libros
                }
            } else {
                return "Error al obtener productos"
            }
        } catch(error) {
            console.error('Error al obtener productos', error)
            return null
        }
    }
    // Primera carga json
    cargarProductosOk()

    function cargarParametros(){
    let parametroCat = new URLSearchParams(window.location.search).get('q');

    if(parametroCat != undefined) { 
        let categoria = document.getElementById(parametroCat);
        if(categoria == undefined) {
            categoria = document.getElementById('btn-todos-prod');
        }
        filtrarCategorias(categoria);
    } else {
        const categoria = document.getElementById('btn-todos-prod');
        filtrarCategorias(categoria);
    }}

});
};

// Carga de productos en el contenedor
function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";
    // para ordenar alfabeticamente los libros
    productosElegidos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("libro");
        div.innerHTML = `
            <div class="container-img-libro">
            <a href="./detail.html?id=${producto.id}"><img class="img-libro" src="${producto.imagen}" alt="${producto.nombre}"></a>
            </div>
            
            <div class="detalles-prod">
                <h3 class="title-prod">${producto.nombre}</h3>
                <p class="precio-prod">$ ${producto.precio}</p>
                <button class="agregar-prod" id="${producto.id}" data-id="${producto.id}">Agregar al <i class="fa-solid fa-cart-shopping carrito"></i></button>
            </div>
        `;

        contenedorProductos.append(div);
    })
    actualizarBotonesAgregar();
}

// Evento a todos los botones agregar al carrito creados con js
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".agregar-prod");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

function filtrarCategorias(e){
    
    let categoriaSeleccionada = "";
     // quita .active a todos los btn categoria y se lo agrega al clickeado
     if (e !== undefined) {
        categoriaSeleccionada = e.id;
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.classList.add("active");
     } 
     else {
        console.log("Error al filtrar categoria");
     }

     if (categoriaSeleccionada != "btn-todos-prod") {
     //  carga de los productos filtrados por categoria
         const productosCategoriaSeleccionada =libros.filter(libro => libro.categoria.id === categoriaSeleccionada);
         tituloCategoria.innerText = productosCategoriaSeleccionada[0].categoria.nombre;
         cargarProductos(productosCategoriaSeleccionada);    
     } else {
         tituloCategoria.innerText = "Catálogo";
         cargarProductos(libros);
     }
 };

// Agrega parametro a la url segun la categoria seleccionada
botonesCategorias.forEach( boton => {
    boton.addEventListener("click", (e) => {
        location.href = "store.html?q="+ e.target.id;
    })
 });
 


// Agrega los productos seleccionados al carrito
function agregarAlCarrito(e) {
    cart = JSON.parse(localStorage.getItem("productos-en-carrito"));
    let buttonClick = e.target;
    console.log(buttonClick)
    let idProduct = buttonClick.dataset.id;
    const idBoton = buttonClick.id;
    const productoAgregado = libros.find(libro => libro.id === idBoton);
    if(cart != null) {
    // si en el carrito ya esta el producto, no lo vuelve a agregar pero si actualiza la cantidad pedida
        if(cart.some(libro => libro.id === idBoton)) {
            const index = cart.findIndex(libro => libro.id === idBoton);
            cart[index].carrito.cantidad += 1
        } else {
            productoAgregado.carrito.cantidad += 1;
            cart.push(productoAgregado);
        }

    actualizarCarritoLS();
    
    
    initApp();
    actualizarNumerito();
    } else {
        console.log("Error al agregar producto");   
    }};

// Obtener referencia al elemento select
const filtroAutor = document.querySelector('.select_autor');
const filtroEditorial = document.querySelector('.select_editorial');
// Escuchar el evento change en el select
filtroAutor.addEventListener('change', function() {
    //valor seleccionado del select
    const selectedAutor = filtroAutor.value;
    // Filtrar los libros basados en el autor seleccionado
    if ( selectedAutor != "Autores"){
        const filteredBooks = libros.filter(libro =>libro.autor === selectedAutor);
        cargarProductos(filteredBooks);
        } else {
            cargarProductos(libros);
        }
});
// Escuchar el evento change en el select
filtroEditorial.addEventListener('change', function() {
    //valor seleccionado del select
    const selectedEditorial = filtroEditorial.value;
    // Filtrar los libros basados en la editorial seleccionada
    if ( selectedEditorial != "Editoriales"){
        const filteredBooks = libros.filter(libro =>libro.editorial === selectedEditorial);
        cargarProductos(filteredBooks);
        } else {
            cargarProductos(libros);
        }
});

