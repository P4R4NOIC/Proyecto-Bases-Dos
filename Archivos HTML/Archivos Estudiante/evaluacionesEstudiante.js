var contestado = new Boolean(false);
var evaluacionesPorEstudiante = {"codigoUsuario":"", 
                                 "codigoCurso":"", 
                                 "nombreCurso":"", 
                                 "evaluaciones":[]}


var evaluacion = {"idCurso":"",
                  "id":"",
                  "nombre":"",
                  "inicio":"", 
                  "fin":""}
                            
var preguntas = {"idEvaluacion":"", "preguntas":[]}


function cargarPagina(){
    //FUNCION DE AUTENTICACION DE USUARIO
    autenticar()
    document.getElementById("nombreEstudiante").textContent = localStorage.getItem("usuario");
    
    pedirEvaluacionesEstudiante();
    cargaEvaluacionesPrevias();

    pedirEvaluacion();
    pedirPreguntas();

    cargaPreguntas();

    //CARGA LA PAGINA CUANDO TODO ESTA LISTO
    document.addEventListener("DOMContentLoaded", cargarPagina);
}

function pedirEvaluacionesEstudiante(){
  
  let datosRecibidos;
  // Hacer la solicitud GET al servidor
  fetch('http://localhost:3000/consultarNotasEstudiante/'+localStorage.getItem("codigoCursoActual") + "/" + localStorage.getItem("usuario"))
  .then(response => {
      if (!response.ok) {
          alert('No se pudo obtener la información del usuario');
      }
      return response.json(); // Parsea la respuesta JSON
  })
  .then(data => {
      // Datos recibidos
      datosRecibidos = data;
      localStorage.setItem("evalEst", JSON.stringify(datosRecibidos))

  })
  .catch(error => {
      console.error('Error al obtener la información del usuario:', error);
  });
}

function pedirEvaluacion(){
  
  let datosRecibidos;
  // Hacer la solicitud GET al servidor
  fetch('http://localhost:3000/consultarEvaluaciones/'+localStorage.getItem("codigoCursoActual"))
  .then(response => {
      if (!response.ok) {
          alert('No se pudo obtener la información del usuario');
      }
      return response.json(); // Parsea la respuesta JSON
  })
  .then(data => {
      // Datos recibidos
      datosRecibidos = data;
      localStorage.setItem("evaluacionActual", JSON.stringify(datosRecibidos))

  })
  .catch(error => {
      console.error('Error al obtener la información del usuario:', error);
  });
}

function pedirPreguntas(){

  let datosRecibidos;
  // Hacer la solicitud GET al servidor
  fetch('http://localhost:3000/consultarPreguntas/'+ evaluacion["id"])
  .then(response => {
      if (!response.ok) {
          alert('No se pudo obtener la información del usuario');
      }
      return response.json(); // Parsea la respuesta JSON
  })
  .then(data => {
      // Datos recibidos
      datosRecibidos = data;
      localStorage.setItem("preguntasLista", JSON.stringify(datosRecibidos))

  })
  .catch(error => {
      console.error('Error al obtener la información del usuario:', error);
  });
}

function cargaEvaluacionesPrevias(){

    evaluacionesPorEstudiante = JSON.parse(localStorage.getItem("evalEst"))

    for(var i = 0; i < evaluacionesPorEstudiante["evaluaciones"].length; i++){
      var li = document.createElement("li");
      var div1 = document.createElement("div");
      var div2 = document.createElement("div");
      var span = document.createElement("span");
  
      li.classList = "list-group-item d-flex justify-content-between align-items-start eval";
      div1.classList = "ms-2 me-auto";
      div2.classList = "fw-bold";
      div2.textContent = evaluacionesPorEstudiante["evaluaciones"][i]["nombreEvaluacion"];
      span.classList = "badge bg-primary rounded-pill";
      span.textContent = evaluacionesPorEstudiante["evaluaciones"][i]["nota"]
  
      div1.appendChild(div2);
      li.appendChild(div1);
      li.appendChild(span);
      document.querySelector(".lista").appendChild(li);
    }
}



function cargaPreguntas(){

  evaluacion = JSON.parse(localStorage.getItem("evaluacionActual"));
  preguntas = JSON.parse(localStorage.getItem("preguntasLista"));

  document.getElementById("agregaNombreEval").placeholder = evaluacion["nombre"];
  document.getElementById("codigoEval").placeholder = evaluacion["id"];
  document.getElementById("fecEvaInit").value = evaluacion["inicio"];
  document.getElementById("fecEvaEnd").value = evaluacion["fin"];
 

  var cantidadPreguntas = preguntas["preguntas"].length;

  if(contestado == false){
  for(var i = 0; i < cantidadPreguntas; i++){
 
    var div1 = document.createElement("div");
    var div2 = document.createElement("div");
    var div3 = document.createElement("div");
    var div4 = document.createElement("div");
    var div5 = document.createElement("div");
    var div6 = document.createElement("div");
    var div7 = document.createElement("div");
    var div8 = document.createElement("div");
    

    var label = document.createElement("label");
    var textarea = document.createElement("texarea");

    var input1 = document.createElement("input");
    var label1 = document.createElement("label2");

    var input2 = document.createElement("input");
    var label2 = document.createElement("label2");

    var input3 = document.createElement("input");
    var label3 = document.createElement("label2");

    var input4 = document.createElement("input");
    var label4 = document.createElement("label2");


    div1.classList = "row preguntas";
    
    div2.classList = "col preguntasPregunta";

    label.classList = "labels menosLabel";
    label.id = "lab";
    label.textContent = "Pregunta " + (i+1);

    textarea.classList = "form-control entrada";
    textarea.id = "pregunta" + (i+1);
    textarea.rows = "3";
    textarea.textContent = preguntas["preguntas"][i]["pregunta"];
    textarea.readonly = true;


    div2.appendChild(label);
    div2.appendChild(textarea);


    div3.classList = "col preguntasOpciones";

    div4.classList = "form-check";

    input1.classList = "form-check-input";
    input1.type = "radio";
    input1.name = "flexRadioDefault" + (i+1);
    input1.id = "correctaPregunta" + (i+1); 
    input1.value = "#";

    label1.classList = "labels menosLabel";
    label1.for = "flexRadioDefault" + (i+1);
    label1.textContent = preguntas["preguntas"][i]["correcta"];


    div4.appendChild(input1);
    div4.appendChild(label1);
    
    div3.appendChild(div4);

    div5.classList = "form-check";

    input2.classList = "form-check-input";
    input2.type = "radio";
    input2.name = "flexRadioDefault" + (i+1);
    input2.id = "incorrecta" + (i+1) + "Pregunta" + (i+1); 
    input2.value = "#";

    label2.classList = "labels menosLabel";
    label2.for = "flexRadioDefault" + (i+1);
    label2.textContent = preguntas["preguntas"][i]["opcionB"];

    div5.appendChild(input2);
    div5.appendChild(label2);
    div3.appendChild(div5);

    div6.classList = "form-check";

    input3.classList = "form-check-input";
    input3.type = "radio";
    input3.name = "flexRadioDefault" + (i+1);
    input3.id = "incorrecta" + (i+2) + "Pregunta" + (i+1); 
    input3.value = "#";

    label3.classList = "labels menosLabel";
    label3.for = "flexRadioDefault" + (i+1);
    label3.textContent = preguntas["preguntas"][i]["opcionC"];

    div6.appendChild(input3);
    div6.appendChild(label3);
    div3.appendChild(div6);

    div7.classList = "form-check";

    input4.classList = "form-check-input";
    input4.type = "radio";
    input4.name = "flexRadioDefault" + (i+1);
    input4.id = "incorrecta" + (i+3) + "Pregunta" + (i+1); 
    input4.value = "#";

    label4.classList = "labels menosLabel";
    label4.for = "flexRadioDefault" + (i+1);
    label4.textContent = preguntas["preguntas"][i]["opcionD"];

    div7.appendChild(input4);
    div7.appendChild(label4);
    div3.appendChild(div7);

    div1.appendChild(div2);
    
    div1.appendChild(div3);

    document.querySelector(".todasPreguntas").appendChild(div1);

  }
 }
}
  
function botonGuardaRespuestas(){
  contestado = true;
 
  var nota = 0;

 var cantPreguntas = preguntas["preguntas"].length;
 for(var i = 0; i < cantPreguntas; i++){

  if(document.getElementById("correctaPregunta" + (i+1)).checked){
    nota++;
  }
  
 }
 
 var notaFinal = (nota/cantPreguntas)*100;
 var evaluacionNueva = {"nombreEvaluacion":evaluacion["nombre"], "nota":notaFinal};
 evaluacionesPorEstudiante["evaluaciones"].push(evaluacionNueva);

 var li = document.createElement("li");
 var div1 = document.createElement("div");
 var div2 = document.createElement("div");
 var span = document.createElement("span");
  
 li.classList = "list-group-item d-flex justify-content-between align-items-start eval";
 div1.classList = "ms-2 me-auto";
 div2.classList = "fw-bold";
 div2.textContent = evaluacionNueva["nombreEvaluacion"];
 span.classList = "badge bg-primary rounded-pill";
 span.textContent = notaFinal;
  
 div1.appendChild(div2);
 li.appendChild(div1);
 li.appendChild(span);
 document.querySelector(".lista").appendChild(li);
 
 document.getElementById("todasPreguntas").remove();
 document.getElementById("botonGuarda").textContent = "Respuestas Guardadas";
 document.getElementById("botonGuarda").disabled = true;

 guardarNota(evaluacionesPorEstudiante)


}

function guardarNota(todo){
 var notaEstudiante = JSON.stringify(todo)
  //cambiar link
  fetch('http://localhost:3000/GuardarDocumento/Notas' , {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: notaEstudiante
  })
}