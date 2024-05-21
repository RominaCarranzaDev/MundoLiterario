window.addEventListener('load', ()=> {

    const form = document.getElementById ('form_inicio_sesion')
    const correo = document.querySelector ('.correo')
    const contraseña = document.querySelector ('.contraseña')
    
    
        form.addEventListener('submit', (e) =>{
            e.preventDefault() 
            validarCampos()
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
            } 
          
            
            if(!contraseñaValor) {
                campoError (contraseña, 'Campo Vacio')
            
            } else if (contraseñaValor.length < 8 ){
                campoError (contraseña, 'La contraseña debe tener minimo 8 caracteres')

            } else {
                campoOk (contraseña)
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
            return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(correo);
         };
});
