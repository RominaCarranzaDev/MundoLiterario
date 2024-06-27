window.addEventListener('load', ()=> {

    const form = document.getElementById ('form_inicio_sesion')
    const correo = document.querySelector ('.correo')
    const contraseña = document.querySelector ('.contraseña')
    const administracion = document.getElementById('page-admin');
    let correoOK = false;
    let passwordOk = false;

    
        form.addEventListener('submit', async(e) =>{
            e.preventDefault() 
            const valueCorreo = document.getElementById("correo").value
            const valuePassword = document.getElementById("password").value

            let pass = validarCampos()
            
           
           if(pass){
                console.log("Validando..")
                let found = await validarLogin(valueCorreo, valuePassword);
                if(found){
                    administracion.classList.remove("invisible")
                    window.location.href =" ../pages/administration.html"
                }
           }
            
        });
         
        const validarCampos = () => {
            
            const correoValor = correo.value
            const contraseñaValor = contraseña.value  
            if(!correoValor) {
                campoError (correo, 'Campo Vacio')
                
            } else if (!validarCorreo(correoValor)){
                campoError (correo, 'El correo no es valido')

            } else {
                campoOk (correo)
                correoOK = true
            } 
          
            
            if(!contraseñaValor) {
                campoError (contraseña, 'Campo Vacio')
            
            } else if (contraseñaValor.length < 8 ){
                campoError (contraseña, 'La contraseña debe tener minimo 8 caracteres')

            } else {
                campoOk (contraseña)
                passwordOk = true
            } 

            if(correoOK && passwordOk){
                return true
            }
        };


        
        const campoError = (input, mensaje) => {
            const formTexto = input.parentElement
            const aviso = formTexto.querySelector('.falla')
            aviso.innerText = mensaje
            aviso.style.display = 'flex'
            
            formTexto.className = 'formulario_error'
        }
        
        const campoOk = (input) => {
            const formTexto = input.parentElement
            const borrar = formTexto.querySelector('.falla')
            borrar.style.display = 'none'

            formTexto.className = 'formulario_ok'
        };

        
        const validarCorreo = (correo) => {
            return /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(correo);
         };
});


async function validarLogin(correo, password) {
    try {
        const response = await fetch(`${URL_API}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo, password })
        });
        if (response.ok) {
            const data = await response.json()
            return data.found
        } else {
            console.error('Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error al conectarse al servidor:', error);
    }
}
