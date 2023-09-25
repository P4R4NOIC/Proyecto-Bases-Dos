var seccionesCargadas = new Boolean(true);
var lista1Cargada = new Boolean(true);
var lista2Cargada = new Boolean(true);
var entrada = [{"seccion":"Referencias", "contenido":["iguana.txt", "lagarto.pdf", "lagartijo.pptx"], 
                
                "temas":[ {"tema":"Referencias++", "contenido":[], 
                            
                            "subtemas":[{"subtema":"Referencias Reloaded", "contenido":[]},
                                        
                                        {"subtema":"Notas Reloaded", "contenido":[]}]}, 
                
                          {"tema":"Notas++", "contenido":[],
                            
                            "subtemas":[]}]}, 

               {"seccion":"Notas", "contenido":[], "temas":[]}, 


               {"seccion":"Otro", "contenido":[], "temas":[]}]



function cargarPagina(){
    //FUNCION DE AUTENTICACION DE USUARIO
    autenticar()
    cargarFunciones()
    //CARGA LA PAGINA CUANDO TODO ESTA LISTO
    document.addEventListener("DOMContentLoaded", cargarPagina);
}

function cargarFunciones(){

    document.getElementById("tituloCurso").textContent = localStorage.getItem("cursoActual");
    document.getElementById("tituloTabla").textContent = "Secciones";
    cargarSecciones();
}

//CARGA SECCIONES AL INICIAR
function cargarSecciones(){
    if(lista2Cargada == false){
        for(var i = 0; i < entrada.length; i++){
            document.getElementById("filas").remove();
        }
        lista2Cargada = true;
    }

 if(lista1Cargada == true){
   for(var i = 0; i < entrada.length; i++){

    var seccion = entrada[i]["seccion"];
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
    
    for(var i = 0; i<entrada.length; i++){
        var seccion = entrada[i]["seccion"];
        creaListas(seccion, i);
    }
    
 }

}

function cargarTemas(tema){
    document.getElementById("tituloTabla").textContent = "Secciones/Tema";
    
    for(var i = 0; i < entrada.length; i++){
        document.getElementById("filas").remove();
    }

    var contenido = entrada[tema]["contenido"].length;
    var temas = entrada[tema]["temas"].length;
   if(lista2Cargada == true){
    if(contenido > 0){
        for(var i = 0; i < contenido; i++){
            creaListas(entrada[tema]["contenido"][i], i);
        }
        
    }
    if(temas > 0){

        for(var i = 0; i < temas; i++){

            var tema = entrada[tema]["temas"][i]["tema"];
            var ele = document.createElement("a");
            ele.classList = "dropdown-item";
            ele.innerHTML = tema;
            ele.id = "tema" + (i+1);
    
            ele.onclick = function (){
                actualizarTema(this.innerHTML)
            }; 

            document.querySelector(".menu2").appendChild(ele);

            creaListas(entrada[tema]["temas"][i]["tema"], i);
        }
    }

    lista2Cargada = false;
 }

    seccionesCargadas = false;
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

}

//CLICK EN SELECCIONAR SECCION
function actualizarSeccion(item){

    document.getElementById("dropdownMenuButton1").innerHTML = item;
    //ACTUALIZA LISTA CON SECCION
    var i = 0;
    for(i; i < entrada.length; i++){
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
function actualizarTema(item) {
    document.getElementById("dropdownMenuButton2").innerHTML = item;

    //ACTUALIZA LISTA CON TEMA
   
    //---------------------------
    activaDesactivaSubTemas(false);
}

//CLICK EN SELECCIONAR SUBTEMA
function actualizarSubTema(item){
    document.getElementById("dropdownMenuButton3").innerHTML = item.innerHTML;

    //ACTUALIZA LISTA CON SUBTEMA

    //---------------------------
}

function activaDesactivaSecciones(estado){
    document.getElementById("dropdownMenuButton1").disabled = estado;
    document.getElementById("tituloTabla").textContent = "Secciones";

    if(seccionesCargadas == false){
        cargarSecciones();
        seccionesCargadas = true;
    }
    
    document.getElementById("dropdownMenuButton1").innerHTML = "Seleccionar Sección";
    document.getElementById("botonAgregarSeccion").disabled = estado;
    document.getElementById("agregarTemaSeccion").disabled = estado;
    document.getElementById("agregarTemaSeccion").value = '';
    document.getElementById("agregarArchivoSeccion").disabled = estado;
    document.getElementById("archivoSeccion").disabled = estado;
    document.getElementById("archivoSeccion").value = '';
}

function activaDesactivaTemas(estado){
    document.getElementById("dropdownMenuButton2").disabled = estado;
    document.getElementById("dropdownMenuButton2").innerHTML = "Seleccionar Tema";
    document.getElementById("botonAgregarTema").disabled = estado;
    document.getElementById("agregarSubTema").disabled = estado;
    document.getElementById("agregarSubTema").value = '';
    document.getElementById("agregarArchivoTema").disabled = estado;
    document.getElementById("archivoTema").disabled = estado;
    document.getElementById("archivoTema").value = '';
}

function activaDesactivaSubTemas(estado){
    document.getElementById("dropdownMenuButton3").disabled = estado;
    document.getElementById("dropdownMenuButton3").innerHTML = "Seleccionar Sub-Tema";
    document.getElementById("agregarArchivoSubTema").disabled = estado;
    document.getElementById("archivoSubTema").disabled = estado;
    document.getElementById("archivoSubTema").value = '';
}
