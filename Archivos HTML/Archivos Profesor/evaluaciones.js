
var contenedorPreguntas = document.getElementById("preguntas");
var presionado = new Boolean(false)

function cargarPagina(){
    //FUNCION DE AUTENTICACION DE USUARIO
    autenticar()
    document.getElementById("nombreProfesor").textContent = localStorage.getItem("usuario");
    
    //CARGA LA PAGINA CUANDO TODO ESTA LISTO
    document.addEventListener("DOMContentLoaded", cargarPagina);
}

function generarPreguntas(value){

    if(presionado == false){
    
        var i = value-1;
        document.getElementById('lab').innerHTML = 'Pregunta ' + (i+1)
    
        for(i; i> 0; i--){
            var elem = document.querySelector(".preguntas");
            var clone = elem.cloneNode(true);
            clone.id = "preguntas" + i;
            document.getElementById('lab').innerHTML = 'Pregunta ' + i;
            elem.after(clone);  
        }
    }
    presionado = true;
    
}