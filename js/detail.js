// async function fetchAndDisplaySingleProduct (){
//     const productoId = new URLSearchParams (window.location.search).get('id');
//     const response = await fetch(`../json/books.json/${productoId}`);
//     const producto = await response.json();
//     console.log(producto, productoId);
// }

// fetchAndDisplaySingleProduct();


const productoContainer = document.querySelector('#card__unidad');


fetch("../json/books.json")
    .then(response => response.json())
    
    .then(data => {
        libros = data;
        console.log(libros);
        const productoId = new URLSearchParams (window.location.search).get('id');
        console.log(productoId);
        const objetoConId = data.find(item => item.id === productoId);
        console.log(objetoConId);
        displayProducto(objetoConId);
        actualizarBotonesAgregar();
})

function displayProducto(objetoConId) {
    productoContainer.innerHTML = `
    
                <div class="card__title">
                  <h3>${objetoConId.categoria.sub_categoria}</h3>
                </div>
                <div class="card__body">
                  <div class="half">
                    <div class="featured_text">
                      <h1>${objetoConId.nombre}</h1>
                      <p class="sub">${objetoConId.autor}</p>
                      <p class="price">$${objetoConId.precio}</p>
                    </div>
                    <div class="image">
                      <img src=${objetoConId.imagen}>  
                    </div>
                  </div>
                  <div class="half">
                    <div class="description">
                      <p class="sinopsis">Sinopsis:</p>  
                      <p class="sinopsis">${objetoConId.descripcion}</p>
                    </div>
                    <span class="stock"><i class="fa fa-pen"></i>En stock</span>
                    <div class="reviews">
                      <ul class="stars">
                        <li><i class="fa fa-star"></i></li>
                        <li><i class="fa fa-star"></i></li>
                        <li><i class="fa fa-star"></i></li>
                        <li><i class="fa fa-star"></i></li>
                        <li><i class="fa fa-star-o"></i></li>
                      </ul>
                      <span>(64 reviews)</span>
                    </div>
                  </div>
                </div>
                <div class="card__bar"></div>
                <div class="card__footer">
                  <div class="recommend">
                    <h3>Mundo Literario</h3>
                    <p>Compartir:</p>
                    <ul class="social">
                      <li><i class="fa-brands fa-facebook"></i></li>
                      <li><i class="fa-brands fa-instagram"></i></li>
                      <li><i class="fa-brands fa-pinterest"></i></li>
                    </ul>
                  </div>
                  <div class="action">
                    <button type="button" class="agregar-prod" id="${objetoConId.id}" data-id="${objetoConId.id}">Agregar</button>
                  </div>
                </div>
            
    `;
    const sinopsis = document.querySelector(".description");
    if (objetoConId.descripcion == null) {
      sinopsis.style.display = "none";
    };
} 


