
var evaluacionesPrevias = [{"evaluacion":"Prueba 1", "valor":"10%"}, 
                            {"evaluacion":"Prueba 2", "valor":"20%"},
                            {"evaluacion":"Prueba 3", "valor":"70%"}]

var evaluacion = {"idCurso":"bla bla",
                  "id":"1",
                  "nombre":"bla bla",
                  "inicio":"1/2/3", 
                  "fin":"1/2/3"}
                            
var preguntas ={"idEvaluacion":evaluacion["id"],
                "preguntas":[
                {"id":"1",
                "pregunta":"nombre", 
                "correcta":"bla bla", 
                "opcionB":"bla bla", 
                "opcionC":"bla bla",
                "opcionD":"bla bla"},
                 
                {"id":"2",
                "pregunta":"nombre", 
                "correcta":"bla bla", 
                "opcionB":"bla bla", 
                "opcionC":"bla bla",
                "opcionD":"bla bla"}, 
                
                {"id":"3",
                "pregunta":"nombre", 
                "correcta":"bla bla", 
                "opcionB":"bla bla", 
                "opcionC":"bla bla",
                "opcionD":"bla bla"}, 
                
                {"id":"4",
                "pregunta":"nombre", 
                "correcta":"bla bla", 
                "opcionB":"bla bla", 
                "opcionC":"bla bla",
                "opcionD":"bla bla"}]}
                            

var contenedorPreguntas = document.getElementById("preguntas");
var presionado = new Boolean(false)


function cargarPagina(){
    //FUNCION DE AUTENTICACION DE USUARIO
    autenticar()
    document.getElementById("nombreProfesor").textContent = localStorage.getItem("usuario");
    
    cargaEvaluacionesPrevias();

    //CARGA LA PAGINA CUANDO TODO ESTA LISTO
    document.addEventListener("DOMContentLoaded", cargarPagina);
}


function guardarBoton(){
    
}

function creaEvaluacion(){

}

function cargaEvaluacionesPrevias(){
    
  for(var i = 0; i < evaluacionesPrevias.length; i++){
    var li = document.createElement("li");
    var div1 = document.createElement("div");
    var div2 = document.createElement("div");
    var span = document.createElement("span");

    li.classList = "list-group-item d-flex justify-content-between align-items-start eval";
    div1.classList = "ms-2 me-auto";
    div2.classList = "fw-bold";
    div2.textContent = evaluacionesPrevias[i]["evaluacion"];
    span.classList = "badge bg-primary rounded-pill";
    span.textContent = evaluacionesPrevias[i]["valor"];

    div1.appendChild(div2);
    li.appendChild(div1);
    li.appendChild(span);
    document.querySelector(".lista").appendChild(li);
  }
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