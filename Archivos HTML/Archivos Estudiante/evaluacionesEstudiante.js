var evaluacionesPrevias = [{"evaluacion":"Prueba 1", "valor":"10%"}, 
                            {"evaluacion":"Prueba 2", "valor":"20%"},
                            {"evaluacion":"Prueba 3", "valor":"70%"}]

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
                  "id":"",
                  "nombre":"",
                  "inicio":"", 
                  "fin":""}
                            
var preguntas = {"idEvaluacion":"", "preguntas":[]}


function cargarPagina(){
    //FUNCION DE AUTENTICACION DE USUARIO
    autenticar()
    document.getElementById("nombreEstudiante").textContent = localStorage.getItem("usuario");
    
    cargaEvaluacionesPrevias();

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
  