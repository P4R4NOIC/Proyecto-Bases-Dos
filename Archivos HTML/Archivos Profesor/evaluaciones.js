
var contenedorPreguntas = document.getElementById("preguntas");
var presionado = new Boolean(false)

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