
libros = cargarProductosOk();

function cargarBusqueda(libros) {
    // Trae el valor del parametro s de la busqueda
    let paramSearch = new URLSearchParams(window.location.search).get('s');
    // Comprueba que el parametro no es vacio
    if (paramSearch != ""){
        const titleSearch = document.getElementById("search_span");
        const containerSearchName = document.getElementById("search_name");
        const containerSearchAuthor = document.getElementById("search_author");
        // coloca en el titulo el string buscado
        titleSearch.innerText = paramSearch;
        // Filtra los libros basados en el nombre del titulo y/o autor seleccionado
        const filteredBooksName = libros.filter(libro => libro.nombre.toLowerCase().includes(paramSearch));
        const filteredBooksAuthor = libros.filter(libro => libro.autor.toLowerCase().includes(paramSearch));
        // Si encuentra al menos una concidencia mostrara los resultados
        if( filteredBooksAuthor.length > 0) {
            filterSearch(filteredBooksAuthor, containerSearchAuthor);
        };
        if( filteredBooksName.length > 0) {
            filterSearch(filteredBooksName, containerSearchName);
        };
    
        // Muestra los datos filtrados
        function filterSearch(filteredBooks, container) {
            // limpia el container
            container.innerHTML = "";
            // para ordenar alfabeticamente los libros
            filteredBooks.sort((a, b) => a.nombre.localeCompare(b.nombre));
            filteredBooks.forEach(libro => {
                // crea un div con la clase item-search para cada libro 
                const itemEncontrado = document.createElement("div");
                itemEncontrado.classList.add("item-search");
                itemEncontrado.innerHTML = `
                    <div class="container-img-libro_search">
                        <a href="./detail.html?id=${libro.id}"><img src="${libro.imagen}" alt="${libro.nombre}"></a>
                    </div>
                    <div class="description_search">
                        <a href="./detail.html?id=${libro.id}"><h3>${libro.nombre}</h3></a>
                        <h4>${libro.autor}</h4>
                        <p >$${libro.precio}</p>
                    </div>
                    <a href="./detail.html?id=${libro.id}" class="btn">Ver mas... </a>
                    `;

            container.append(itemEncontrado);
            });
        };
    };
};