const containerLibros = document.getElementById("container-books");
const formBooks = document.getElementById('formBooks');
const btnCloseSession = document.getElementById('close-session');
const administracion = document.getElementById('page-admin');

window.addEventListener('load', function(e) {
    fetchLibros();
});
// GET para obtener todos los libros
async function fetchLibros() {
    try {
        const response = await fetch(`${URL_API}/books/`);
      
        if(response.ok) {
            const data = await response.json();
            console.log(data)
            if(data) {
                cargarLibros(data);
                return data
            }
        } else {
            console.log("Error al obtener los libros")
            return "Error al obtener los libros"
        }
    } catch(error) {
        console.error('Error al conectarse a la base de datos', error)
        return null
    }
}
// Carga los libros en el container-books
function cargarLibros(libros) {
    containerLibros.innerHTML = "";
    // para ordenar alfabeticamente los libros
    libros.sort((a, b) => a.nombre.localeCompare(b.nombre));
    console.log(libros)
    libros.forEach(libro => {

        const div = document.createElement("div");
        div.innerHTML = `
            <div class="container-img-libro">
                <img class="img-libro" src="${libro.imagen}" alt="${libro.nombre}"></a>
            </div>
            
            <div class="detalles-libro">
                <h3>${libro.nombre}</h3>
                <h4>Código: ${libro.codigo}</h4>
                <p>Categoría: ${libro.nombre_categoria}</p>
                <p>Autor: ${libro.autor}</p>
                <p>$ ${libro.precio}</p>
                <p>Stock disponible: ${libro.stock}</p>
                <p>Editorial: ${libro.editorial}</p>
                <p>Descripción: ${libro.descripcion}</p>
                <button class="editLibro" id="btn-edit-book" data-id="${libro.id}"><i class="fa-solid fa-file-pen"></i></button>
                <button class="deleteLibro" id="btn-delete-book" data-id="${libro.id}"><i class="fa-solid fa-eraser"></i></button>

            </div>
        `;

        containerLibros.append(div);

        // Añadir eventos para editar y eliminar
        div.querySelector('.editLibro').addEventListener('click', () => editLibro(libro));
        div.querySelector('.deleteLibro').addEventListener('click', () => deleteLibro(libro.id));
    })
}


// Post para crear un nuevo libro
formBooks.addEventListener('submit', async (event) => {
    event.preventDefault();
    const codigo = document.querySelector('#formBooks #codigo').value;
    const imagen = document.querySelector('#formBooks #imagen').value;
    const nombre = document.querySelector('#formBooks #nombre').value;
    const autor = document.querySelector('#formBooks #autor').value;
    const categoria = document.querySelector('#formBooks #categoria').value;
    const precio = document.querySelector('#formBooks #precio').value;
    const stock = document.querySelector('#formBooks #stock').value;
    const editorial = document.querySelector('#formBooks #editorial').value;
    const descripcion = document.querySelector('#formBooks #descripcion').value;
    
    try {
        const response = await fetch(`${URL_API}/books/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ codigo, imagen, nombre, autor, categoria, precio, stock, editorial, descripcion })
        });

        if (response.ok) {
            formBooks.reset();
            fetchLibros();
        } else {
            console.error('Error al agregar el libro:');
        }
    } catch (error) {
        console.error('Error al conectarse al servidor:', error);
    }
});

// PUT para actualizar un libro
async function editLibro(libro) {
    const codigo = prompt("Nuevo código:", libro.codigo);
    const imagen = prompt("Nueva imagen URL:", libro.imagen);
    const nombre = prompt("Nuevo nombre:", libro.nombre);
    const autor = prompt("Nuevo autor:", libro.autor);
    const categoria = prompt("Nueva categoría:", libro.categoria);
    const precio = prompt("Nuevo precio:", libro.precio);
    const stock = prompt("Nuevo stock:", libro.stock);
    const editorial = prompt("Nueva editorial:", libro.editorial);
    const descripcion = prompt("Nueva descripción:", libro.descripcion);

    try {
        const response = await fetch(`${URL_API}/books/${libro.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ codigo, imagen, nombre, autor, categoria, precio, stock, editorial, descripcion })
        });

        if (response.ok) {
            fetchLibros();
        } else {
            console.error('Error al actualizar el libro:');
        }
    } catch (error) {
        console.error('Error al conectarse al servidor:', error);
    }
}

// DELETE para eliminar un libro
async function deleteLibro(id) {
    if (confirm("¿Está seguro de que desea eliminar este libro?")) {
        try {
            const response = await fetch(`${URL_API}/books/${id}/`, {
                method: 'DELETE'
            });

            if (response.ok) {
                fetchLibros();
            } else {
                console.error('Error al eliminar el libro:');
            }
        } catch (error) {
            console.error('Error al conectarse al servidor:', error);
        }
    }
}



btnCloseSession.addEventListener('click', ()=>{
    administracion.classList.add("invisible")
    window.location.href = "../index.html"
})




