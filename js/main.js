/**
 * Authors: Grupo 15 Node-JS CAC 2024
 * Version: 1.0.0
 * Fecha: 2024
 * 
 */

// boton que al hacer click hace scroll up
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400, 
    //reset: true
})

sr.reveal(`.new_card, .card1`, {interval:100})

const scrollUp=() =>{
    const scrollUp = document.getElementById('scroll-up')
    this.scrollY >=350 ? scrollUp.classList.add('show-scroll')
                       : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

// botones para la nav en modo mobile
const openMenuMobile = document.getElementById("menu-mobile-btn");
const navMenuMobile = document.getElementById("nav-menu");

openMenuMobile.addEventListener("click", () => {
    navMenuMobile.classList.add("visible");
});
navMenuMobile.addEventListener("mouseout", () => {
    navMenuMobile.classList.remove("visible");
});

const btnSearch = document.querySelector('.btn-search');
const fieldSearch = document.querySelector('.field-search');


btnSearch.addEventListener('mouseover', () => {
    fieldSearch.classList.add('hovered');
    fieldSearch.focus();
});

btnSearch.addEventListener('click', function(e) {
    e.preventDefault()
    // Busqueda ingresada
     const search = fieldSearch.value.toLowerCase();
     if (window.location.pathname.includes("index.html")){
    window.location.href = "./pages/search.html?s="+search;
} else {
    window.location.href = "./search.html?s="+search;
}
})

async function cargarProductosOk() {
    try {
        const response = await fetch("../json/books.json");
      
        if(response.ok) {
            const data = await response.json();

            if(data) {
               let libros = data;
                cargarBusqueda(libros);
                return libros
            }
        } else {
            return "Error al obtener productos"
        }
    } catch(error) {
        console.error('Error al obtener productos', error)
        return null
    }}



let cart = [];
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

let numerito = document.querySelector("#numerito");
let numeritoSidebar = document.querySelector("#numerito-sidebar");
const botonesCategorias = document.querySelectorAll(".btn-categoria");

//Actualiza el contador en caso de volver del carrito a la tienda
if (productosEnCarritoLS != null) {
    actualizarCarrito();
    actualizarNumerito();
} else {
    cart = [];
}
// actualiza los productos cargados en localStorage
function actualizarCarrito() {
    cart = JSON.parse(productosEnCarritoLS);
}
// actualiza los productos de localStorage
function actualizarCarritoLS(){
    localStorage.setItem("productos-en-carrito", JSON.stringify(cart));
}
// actualiza la cantidad de productos en localStorage
function actualizarNumerito() {

    let numeritoActualizado = cart.reduce((acumulador, libro) => acumulador + libro.carrito.cantidad, 0);
    numerito.innerText = numeritoActualizado;
    localStorage.setItem("numeritoActualizado",numeritoActualizado);
    let paginaActual = window.location.pathname;
    if (paginaActual.includes("store.html") ) {
        numeritoSidebar.innerText = numeritoActualizado;
        numerito.textContent = numeritoActualizado;
    }
    if (numerito.innerText === "0" || numerito.textContent === "0") {
        numerito.style.display = "none";
    } else {
        numerito.style.display = "flex";
    }
}

actualizarCarritoLS();






