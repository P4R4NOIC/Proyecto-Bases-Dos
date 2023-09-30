
var evaluacionesPorEstudiante = {"codigoUsuario":"", 
                                 "codigoCurso":"", 
                                 "nombreCurso":"", 
                                 "evaluaciones":[{
                                    "nombreEvaluacion":"Prueba 1", 
                                    "nota":"100"},
                                    {"nombreEvaluacion":"Prueba 2", 
                                     "nota":"75"},
                                    {"nombreEvaluacion":"Prueba 3", 
                                     "nota":"50"}]}


var evaluacion = {"idCurso":"",
                  "id":"EV1",
                  "nombre":"Eval1",
                  "inicio":"", 
                  "fin":""}
                            
var preguntas = {"idEvaluacion":"EV1", "preguntas":[{"id":"pregunta1", 
                                                  "pregunta":"¿como se centra un div?", 
                                                  "correcta":"No se", 
                                                  "opcionB":"con maicena", 
                                                  "opcionC":"con jamon", 
                                                  "opcionD":"con magia"},

                                                  {"id":"pregunta2", 
                                                  "pregunta":"¿como se consigue una buena nota?", 
                                                  "correcta":"con aire", 
                                                  "opcionB":"con esfuerzo y saliva", 
                                                  "opcionC":"con calcio", 
                                                  "opcionD":"con lino"},

                                                  {"id":"pregunta3", 
                                                  "pregunta":"¿quien le ordeno al mundo girar?", 
                                                  "correcta":"ignacio santos", 
                                                  "opcionB":"geovanny vazquez", 
                                                  "opcionC":"yo", 
                                                  "opcionD":"me quedo sin ideas"},

                                                  {"id":"pregunta4", 
                                                  "pregunta":"¿cuanto mas tengo que escribir?", 
                                                  "correcta":"me quedo sin nada", 
                                                  "opcionB":"ya no mas", 
                                                  "opcionC":"una mas", 
                                                  "opcionD":"ya casi"},

                                                  {"id":"pregunta5", 
                                                  "pregunta":"¿final?", 
                                                  "correcta":"si", 
                                                  "opcionB":"ya", 
                                                  "opcionC":"por fin", 
                                                  "opcionD":"termino"}
                                                ]}


function cargarPagina(){
    //FUNCION DE AUTENTICACION DE USUARIO
    autenticar()
    document.getElementById("nombreEstudiante").textContent = localStorage.getItem("usuario");
    
    cargaEvaluacionesPrevias();
    cargaPreguntas();

    //CARGA LA PAGINA CUANDO TODO ESTA LISTO
    document.addEventListener("DOMContentLoaded", cargarPagina);
}

function cargaEvaluacionesPrevias(){
    
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
  document.getElementById("agregaNombreEval").placeholder = evaluacion["nombre"];
  document.getElementById("codigoEval").placeholder = evaluacion["id"];
  var cantidadPreguntas = preguntas["preguntas"].length;
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
    input3.id = "incorrecta" + (i+1) + "Pregunta" + (i+1); 
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
    input4.id = "incorrecta" + (i+1) + "Pregunta" + (i+1); 
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
  