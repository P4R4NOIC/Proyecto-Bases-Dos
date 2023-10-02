var cantPreguntas;
var evaluacionesPrevias = {"idCurso":localStorage.getItem("codigoCursoActual"),
                            "evaluaciones":[]}

var evaluacion = {"idCurso":"",
                  "id":"",
                  "nombre":"",
                  "inicio":"", 
                  "fin":""}
                            
var preguntas = {"idEvaluacion":"", "preguntas":[]}
                            

var contenedorPreguntas = document.getElementById("preguntas");
var presionado = new Boolean(false)


function cargarPagina(){
    //FUNCION DE AUTENTICACION DE USUARIO
    autenticar()
    document.getElementById("nombreProfesor").textContent = localStorage.getItem("usuario");
    pedirEvaluaciones();
    cargaEvaluacionesPrevias();

    //CARGA LA PAGINA CUANDO TODO ESTA LISTO
    document.addEventListener("DOMContentLoaded", cargarPagina);
}


function guardarBoton(){

    var codigo = document.getElementById("codigoEval").value;
    var nombre = document.getElementById("agregaNombreEval").value;
    var inicio = document.getElementById("fecEvaInit").value;
    var fin = document.getElementById("fecEvaEnd").value;

    evaluacion["idCurso"] = localStorage.getItem("codigoCursoActual");
    evaluacion["id"] = codigo;
    evaluacion["nombre"] = nombre;
    evaluacion["inicio"] = inicio;
    evaluacion["fin"] = fin;

    preguntas["idEvaluacion"] = evaluacion["id"];
   
    for(var i = 0; i < cantPreguntas; i++){
        var nuevaPregunta = {"id":"", "pregunta":"", "correcta":"", "opcionB":"", "opcionC":"", "opcionD":""}
        var idPregunta = "pregunta" + (i+1);
        var pregunta = document.getElementById("pregunta" + (i+1)).value
        var respuestaCorrecta = document.getElementById("pregunta" + (i+1) + "respuestaCorrecta").value;
        var respuestaB = document.getElementById("pregunta" + (i+1) + "respuestaIncorrecta1").value;
        var respuestaC = document.getElementById("pregunta" + (i+1) + "respuestaIncorrecta2").value;
        var respuestaD = document.getElementById("pregunta" + (i+1) + "respuestaIncorrecta3").value;

        nuevaPregunta["id"] = idPregunta;
        nuevaPregunta["pregunta"] = pregunta;
        nuevaPregunta["correcta"] = respuestaCorrecta;
        nuevaPregunta["opcionB"] = respuestaB;
        nuevaPregunta["opcionC"] = respuestaC;
        nuevaPregunta["opcionD"] = respuestaD;
        
        preguntas["preguntas"].push(nuevaPregunta);
        
    }
   
    JSON.stringify(preguntas);
    JSON.stringify(evaluacion);

    guardarEvaluacion(evaluacion);
    guardarPreguntas(preguntas);
    


    
}




function cargaEvaluacionesPrevias(){
    
  for(var i = 0; i < evaluacionesPrevias["evaluaciones"].length; i++){
    var li = document.createElement("li");
    var div1 = document.createElement("div");
    var div2 = document.createElement("div");
    var span = document.createElement("span");

    li.classList = "list-group-item d-flex justify-content-between align-items-start eval";
    div1.classList = "ms-2 me-auto";
    div2.classList = "fw-bold";
    div2.textContent = evaluacionesPrevias["evaluaciones"][i]["evaluacion"];
    span.classList = "badge bg-primary rounded-pill";
    span.textContent = evaluacionesPrevias["evaluaciones"][i]["valor"];

    div1.appendChild(div2);
    li.appendChild(div1);
    li.appendChild(span);
    document.querySelector(".lista").appendChild(li);
  }
}



function generarPreguntas(value){
    cantPreguntas = value;




   document.getElementById("botonGuarda").disabled = false; 

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


        var j = 0
        for(j; j < value; j++){
            document.getElementById("pregunta").id = "pregunta" + (j+1);
            document.getElementById("correcta").id = "pregunta" + (j+1) + "respuestaCorrecta";
            document.getElementById("incorrecta1").id = "pregunta" + (j+1) + "respuestaIncorrecta1";
            document.getElementById("incorrecta2").id = "pregunta" + (j+1) + "respuestaIncorrecta2";
            document.getElementById("incorrecta3").id = "pregunta" + (j+1) + "respuestaIncorrecta3";
        }

    }
    presionado = true;
    
}

function guardarEvaluacion(eval){
    fetch('http://localhost:3000/GuardarDocumento/:evaluacion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: eval
    })
}

function guardarPreguntas(preg){
    fetch('http://localhost:3000/GuardarDocumento/:preguntas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: preg
    })
}

function pedirEvaluaciones(){

    let datosRecibidos;
    // Hacer la solicitud GET al servidor
    fetch('http://localhost:3000/consultarEvaluaciones/'+ localStorage.getItem("codigoCursoActual"))
    .then(response => {
        if (!response.ok) {
            alert('No se pudo obtener la información del usuario');
        }
        return response.json(); // Parsea la respuesta JSON
    })
    .then(data => {
        // Datos recibidos
        datosRecibidos = data;
        evaluacionesPrevias = JSON.stringify(datosRecibidos);
       
  
    })
    .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
    });
  }