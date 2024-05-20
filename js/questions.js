/**El siguiente script sirve a frequent_questions.html ycuyo funcionalidad es desplegar las respuestas */

const questions = document.querySelectorAll(".header_ask");

questions.forEach(ask => {
    ask.addEventListener("click", () =>{
        removerClaseActivo();
        ask.nextElementSibling.classList.toggle("activo");
    })
});

function removerClaseActivo(){
    questions.forEach((ask) => {
        ask.nextElementSibling.classList.remove("activo");
    });
}