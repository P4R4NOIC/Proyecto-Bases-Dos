var seccionesCargadas = new Boolean(true);
var seccionSeleccionada;
var temaSeleccionado;
var subTemaSeleccionado;
var lista1Cargada = new Boolean(true);
var lista2Cargada = new Boolean(true);
var lista3Cargada = new Boolean(true);
var lista4Cargada = new Boolean(true);
//var entradaCarga[0] = {"idCurso":localStorage.getItem("codigoCursoActual"), "secciones":[]};
// var entrada = {"idCurso":localStorage.getItem("codigoCursoActual"),"secciones":[{"seccion":"Referencias", "contenido":["inicio.lel"], 

//                 "temas":[ {"tema":"tema1", "contenido":["algo.jpg"], 

//                             "subtemas":[{"subtema":"subtema1", "contenido":["contenido.rpg"]},

//                                         {"subtema":"subtema2", "contenido":["contenido2.rar"]}]}, 

//                           {"tema":"nombre", "contenido":[],

//                             "subtemas":[]}]}, 

//                {"seccion":"Notas", "contenido":[], "temas":[]}, 


//                {"seccion":"Otro", "contenido":[], "temas":[]}] }

var entrada = {"idCurso":localStorage.getItem("codigoCursoActual"), "secciones":[]}
var entradaCarga = {"idCurso":localStorage.getItem("codigoCursoActual"), "secciones":[]};

function cargarPagina(){
    //FUNCION DE AUTENTICACION DE USUARIO
    autenticar()
    document.getElementById("nombreEstudiante").textContent = localStorage.getItem("usuario");
   
    
    
    cargarFunciones()
    //CARGA LA PAGINA CUANDO TODO ESTA LISTO
    document.addEventListener("DOMContentLoaded", cargarPagina);
}

function cargarFunciones(){

    document.getElementById("titulo").textContent = localStorage.getItem("cursoActual");
    document.getElementById("tituloTabla").textContent = "Secciones";
    cargaTodo();
  
    cargarSecciones();

}

function cargaTodo(){
    //llama a la base con el nombre del curso actual
    pedirTodo();
    
    //---BORRAR
    entradaCarga = JSON.parse(localStorage.getItem("secciones"))
    
}

function pedirTodo(){
    
    let datosRecibidos;
    // Hacer la solicitud GET al servidor
    fetch('http://localhost:3000/consultarSeccionesCurso/'+ localStorage.getItem("codigoCursoActual"))
    .then(response => {
        if (!response.ok) {
            alert('No se pudo obtener la información del usuario');
        }
        return response.json(); // Parsea la respuesta JSON
    })
    .then(data => {
        // Datos recibidos
        datosRecibidos = data;
        
        localStorage.setItem("secciones", JSON.stringify(datosRecibidos))

    })
    .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
    });
}
//CARGA SECCIONES AL INICIAR
function cargarSecciones(){
    
    //borra la tabla con la cantidad de listas
    
   
    var table = document.getElementById("cuerpoTabla");
    var rowCount = table.rows.length;

    
    for(var i = 0; i < rowCount; i++){
           document.getElementById("filas").remove();
    }
    
   

 if(lista1Cargada == true){
    
   for(var i = 0; i < entradaCarga[0]["secciones"].length; i++){
    
    var seccion = entradaCarga[0]["secciones"][i]["seccion"];
   
    var ele = document.createElement("a");
    ele.classList = "dropdown-item";
    ele.innerHTML = seccion;
    ele.id = "seccion" + (i+1);
   
    ele.onclick = function (){
        actualizarSeccion(this.innerHTML)
     };
    
    document.querySelector(".menu1").appendChild(ele);

    
    creaListas(seccion, i);
    
  
   }
   lista1Cargada = false;

 }
  else{
    
    for(var i = 0; i<entradaCarga[0]["secciones"].length; i++){
        var seccion = entradaCarga[0]["secciones"][i]["seccion"];
        creaListas(seccion, i);
        lista2Cargada = false;
    }
    
  }

}

function cargarTemas(tema){
    document.getElementById("tituloTabla").textContent = "Secciones/Tema";
    seccionSeleccionada = tema;
    var table = document.getElementById("cuerpoTabla");
    var rowCount = table.rows.length;

   
    for(var i = 0; i < rowCount; i++){
           document.getElementById("filas").remove();
    }
   
    var contenido = entradaCarga[0]["secciones"][tema]["contenido"].length;
    var temas = entradaCarga[0]["secciones"][tema]["temas"].length;
   



   if(lista2Cargada == true){
    temaAnterior = tema;
   var temaAnterior = tema;
     if(contenido > 0){
        for(var i = 0; i < contenido; i++){
            creaListas(entradaCarga[0]["secciones"][tema]["contenido"][i], i);
        }
        
     }
     if(temas > 0){

        for(var i = 0; i < temas; i++){

           
           
     
            var ele = document.createElement("a");
            ele.classList = "dropdown-item";
            ele.innerHTML = entradaCarga[0]["secciones"][tema]["temas"][i]["tema"];
            ele.id = "tema" + (i+1);
            
            ele.onclick = function (){
                actualizarTema(this.innerHTML, tema)
             };
        
            document.querySelector(".menu2").appendChild(ele);
            
            creaListas(entradaCarga[0]["secciones"][tema]["temas"][i]["tema"], i);

            
        }
    }

     lista2Cargada = false;
 }
 else{
    for(var i = 0; i<temas; i++){
       
    creaListas(entradaCarga[0]["secciones"][tema]["temas"][i]["tema"], i);
    }
    for(var i = 0; i < contenido; i++){
        creaListas(entradaCarga[0]["secciones"][tema]["contenido"][i], i);
    }
 }

    seccionesCargadas = false;
}


function cargaSubtemas(seccion, tema){
    document.getElementById("tituloTabla").textContent = "Secciones/Tema/Sub-tema";
    temaSeleccionado = tema;

   
    var table = document.getElementById("cuerpoTabla");
    var rowCount = table.rows.length;

    for(var i = 0; i < rowCount; i++){
        document.getElementById("filas").remove();
    }
    
   
    var contenido = entradaCarga[0]["secciones"][seccion]["temas"][tema]["contenido"].length;
    var subtemas = entradaCarga[0]["secciones"][seccion]["temas"][tema]["subtemas"].length;
   

    if(lista3Cargada == true){

        if(contenido > 0){
            for(var i = 0; i < contenido; i++){
                creaListas(entradaCarga[0]["secciones"][seccion]["temas"][tema]["contenido"][i],i);
            }
        }

        if(subtemas > 0){
            for(var i = 0; i < subtemas; i++){
                var ele = document.createElement("a");
                ele.classList = "dropdown-item";
                ele.innerHTML = entradaCarga[0]["secciones"][seccion]["temas"][tema]["subtemas"][i]["subtema"];
                ele.id = "subtema" + (i+1);
                
                ele.onclick = function (){
                    actualizarSubTema(this.innerHTML, tema, seccion)
                 };
            
                document.querySelector(".menu3").appendChild(ele);
                
                creaListas(entradaCarga[0]["secciones"][seccion]["temas"][tema]["subtemas"][i]["subtema"], i);
            }
        }

        lista3Cargada = false;
    }
    else{
        for(var i = 0; i < subtemas; i++){
            creaListas(entradaCarga[0]["secciones"][seccion]["temas"][tema]["subtemas"][i]["subtema"], i);
        }
        for(var i = 0; i < contenido; i++){
            creaListas(entradaCarga[0]["secciones"][seccion]["temas"][tema]["contenido"][i],i);
        }
    }


}

function cargaFinal(seccion, tema, subtema){
    document.getElementById("tituloTabla").textContent = "Secciones/Tema/Sub-tema/Fin";
    subTemaSeleccionado = subtema;
    var table = document.getElementById("cuerpoTabla");
    var rowCount = table.rows.length;

    for(var i = 0; i < rowCount; i++){
        document.getElementById("filas").remove();
    }
    
   
    var contenido = entradaCarga[0]["secciones"][seccion]["temas"][tema]["subtemas"][subtema]["contenido"].length;
    if(lista4Cargada == true){
        if(contenido > 0){
            for(var i = 0; i < contenido; i++){
                creaListas(entradaCarga[0]["secciones"][seccion]["temas"][tema]["subtemas"][subtema]["contenido"][i],i);
            }
        }
        lista4Cargada = false;
    }
    else{
        if(contenido > 0){
            for(var i = 0; i < contenido; i++){
                creaListas(entradaCarga[0]["secciones"][seccion]["temas"][tema]["subtemas"][subtema]["contenido"][i],i);
            }
        }
    }
}

function creaListas(contenido, cantidad){

    var tr = document.createElement("tr");
    tr.classList = "filas";
    tr.id = "filas" 
    var th = document.createElement("th");
    th.scope = "row";
    var refer = document.createElement("a");
    refer.classList = "cursosH cursos";
    refer.id = "filaTabla" + (cantidad+1); 
    refer.textContent = contenido;
    refer.href = contenido;
    th.append(refer);
    tr.appendChild(th);
    document.querySelector(".cuerpoTabla").appendChild(tr)

}







//CLICK EN BOTON CARGAR SECCIONES
function botonCargarSecciones(){
    //ACTIVA SECCIONES
    activaDesactivaSecciones(false);
    //DESACTIVA TEMA
    activaDesactivaTemas(true);
    //DESACTIVA SUBTEMA
    activaDesactivaSubTemas(true);
    lista2Cargada = true;
    lista3Cargada = true;
}

//CLICK EN SELECCIONAR SECCION
function actualizarSeccion(item){

    document.getElementById("dropdownMenuButton1").innerHTML = item;
    console.log(document.getElementById("dropdownMenuButton1").innerHTML)
    //ACTUALIZA LISTA CON SECCION
    var i = 0;
    for(i; i < entradaCarga[0]["secciones"].length; i++){
        if(document.getElementById("seccion" +(i+1)).innerHTML == item){
            break;
        }
    }
    cargarTemas(i);
    //---------------------------
    activaDesactivaTemas(false);
    activaDesactivaSubTemas(true);
}


//CLICK EN SELECCIONAR TEMA
function actualizarTema(item, tema) {
    document.getElementById("dropdownMenuButton2").innerHTML = item;

    //ACTUALIZA LISTA CON TEMA
    var i = 0;
   
    for(i; i < entradaCarga[0]["secciones"][tema]["temas"].length; i++){
        if(item == entradaCarga[0]["secciones"][tema]["temas"][i]["tema"]){
            break;
        }
    }
    
    cargaSubtemas(tema, i);
    //---------------------------
    activaDesactivaSubTemas(false);
}

//CLICK EN SELECCIONAR SUBTEMA
function actualizarSubTema(item, tema, seccion){
    document.getElementById("dropdownMenuButton3").innerHTML = item;

    //ACTUALIZA LISTA CON SUBTEMA
    var i = 0;
   
    for(i; i < entradaCarga[0]["secciones"][seccion]["temas"][tema]["subtemas"].length; i++){
        if(item == entradaCarga[0]["secciones"][seccion]["temas"][tema]["subtemas"][i]["subtema"]){
            break;
        }
    }
    activaDesactivaFinal(false);
    cargaFinal(seccion, tema, i);
    
    //---------------------------
}

function activaDesactivaSecciones(estado){
    document.getElementById("dropdownMenuButton1").disabled = estado;
    document.getElementById("tituloTabla").textContent = "Secciones";
    // if(seccionesCargadas == false){
    //     cargarSecciones();
    //     seccionesCargadas = true;
    // }
    
    document.getElementById("dropdownMenuButton1").innerHTML = "Seleccionar Sección";
   
}

function activaDesactivaTemas(estado){
  document.getElementById("dropdownMenuButton2").disabled = estado;
}

function activaDesactivaSubTemas(estado){
   
    document.getElementById("dropdownMenuButton3").disabled = estado;
    document.getElementById("dropdownMenuButton3").innerHTML = "Seleccionar Sub-Tema";
   
}

function activaDesactivaFinal(estado){

}

function guardarTodo(todo){
    JSON.stringify(todo)
    //cambiar link
    fetch('http://localhost:3000/GuardarDocumento/Correos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: todo
    })
}