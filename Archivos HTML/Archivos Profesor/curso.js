var seccionesCargadas = new Boolean(true);
var seccionSeleccionada;
var temaSeleccionado;
var subTemaSeleccionado;
var lista1Cargada = new Boolean(true);
var lista2Cargada = new Boolean(true);
var lista3Cargada = new Boolean(true);
var lista4Cargada = new Boolean(true);
var entrada = [{"seccion":"Referencias", "contenido":["iguana.txt", "lagarto.pdf", "lagartijo.pptx"], 
                
                "temas":[ {"tema":"Referencias++", "contenido":["sube.rar", "baja.cpp", "derecha.cpp", "izquierda.cpp", "cero.cpp"], 
                            
                            "subtemas":[{"subtema":"Referencias Reloaded", "contenido":["ya.c", "no.hs"]},
                                        
                                        {"subtema":"Notas Reloaded", "contenido":[]}]}, 
                
                          {"tema":"Notas++", "contenido":["algo", "algoMas"],
                            
                            "subtemas":[]}]}, 

               {"seccion":"Notas", "contenido":["contenido", "enNotas"], "temas":[{"tema":"temaNotas"}]}, 


               {"seccion":"Otro", "contenido":["otro","fin"], "temas":[]}]



function cargarPagina(){
    //FUNCION DE AUTENTICACION DE USUARIO
    autenticar()
    document.getElementById("nombreProfesor").textContent = localStorage.getItem("usuario");
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
    
    //borra la tabla con la cantidad de listas
    
   
    var table = document.getElementById("cuerpoTabla");
    var rowCount = table.rows.length;


    for(var i = 0; i < rowCount; i++){
           document.getElementById("filas").remove();
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
   
    var contenido = entrada[tema]["contenido"].length;
    var temas = entrada[tema]["temas"].length;
   



   if(lista2Cargada == true){
    temaAnterior = tema;
   var temaAnterior = tema;
     if(contenido > 0){
        for(var i = 0; i < contenido; i++){
            creaListas(entrada[tema]["contenido"][i], i);
        }
        
     }
     if(temas > 0){

        for(var i = 0; i < temas; i++){

           
           
     
            var ele = document.createElement("a");
            ele.classList = "dropdown-item";
            ele.innerHTML = entrada[tema]["temas"][i]["tema"];
            ele.id = "tema" + (i+1);
            
            ele.onclick = function (){
                actualizarTema(this.innerHTML, tema)
             };
        
            document.querySelector(".menu2").appendChild(ele);
            
            creaListas(entrada[tema]["temas"][i]["tema"], i);

            
        }
    }

     lista2Cargada = false;
 }
 else{
    for(var i = 0; i<temas; i++){
       
    creaListas(entrada[tema]["temas"][i]["tema"], i);
    }
    for(var i = 0; i < contenido; i++){
        creaListas(entrada[tema]["contenido"][i], i);
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
    
   
    var contenido = entrada[seccion]["temas"][tema]["contenido"].length;
    var subtemas = entrada[seccion]["temas"][tema]["subtemas"].length;
   

    if(lista3Cargada == true){

        if(contenido > 0){
            for(var i = 0; i < contenido; i++){
                creaListas(entrada[seccion]["temas"][tema]["contenido"][i],i);
            }
        }

        if(subtemas > 0){
            for(var i = 0; i < subtemas; i++){
                var ele = document.createElement("a");
                ele.classList = "dropdown-item";
                ele.innerHTML = entrada[seccion]["temas"][tema]["subtemas"][i]["subtema"];
                ele.id = "subtema" + (i+1);
                
                ele.onclick = function (){
                    actualizarSubTema(this.innerHTML, tema, seccion)
                 };
            
                document.querySelector(".menu3").appendChild(ele);
                
                creaListas(entrada[seccion]["temas"][tema]["subtemas"][i]["subtema"], i);
            }
        }

        lista3Cargada = false;
    }
    else{
        for(var i = 0; i < subtemas; i++){
            creaListas(entrada[seccion]["temas"][tema]["subtemas"][i]["subtema"], i);
        }
        for(var i = 0; i < contenido; i++){
            creaListas(entrada[seccion]["temas"][tema]["contenido"][i],i);
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
    
   
    var contenido = entrada[seccion]["temas"][tema]["subtemas"][subtema]["contenido"].length;
    if(lista4Cargada == true){
        if(contenido > 0){
            for(var i = 0; i < contenido; i++){
                creaListas(entrada[seccion]["temas"][tema]["subtemas"][subtema]["contenido"][i],i);
            }
        }
        lista4Cargada = false;
    }
    else{
        if(contenido > 0){
            for(var i = 0; i < contenido; i++){
                creaListas(entrada[seccion]["temas"][tema]["subtemas"][subtema]["contenido"][i],i);
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
    th.append(refer);
    tr.appendChild(th);
    document.querySelector(".cuerpoTabla").appendChild(tr)

}

function botonSubirArchivoSeccion(){

    var documento = document.getElementById("archivoSeccion").value;
    entrada[seccionSeleccionada]["contenido"].push(documento);
    var contenido = entrada[seccionSeleccionada]["contenido"].length
    for(var i = 0; i < contenido; i++){
        creaListas(entrada[seccionSeleccionada]["contenido"][i],i);
    }

}

function botonSubirArchivoTema(){
    var documento = document.getElementById("archivoTema").value;
    entrada[seccionSeleccionada]["temas"][temaSeleccionado]["contenido"].push(documento);
    var contenido = entrada[seccionSeleccionada]["temas"][temaSeleccionado]["contenido"].length;
    for(var i = 0; i < contenido; i++){
        creaListas(entrada[seccionSeleccionada]["temas"][temaSeleccionado]["contenido"][i], i);
    }
}

function botonSubirArchivoSubTema(){
    var documento = document.getElementById("archivoSubTema").value;
    entrada[seccionSeleccionada]["temas"][temaSeleccionado]["subtemas"][subTemaSeleccionado]["contenido"].push(documento);
    
}

function botonAgregarSeccion(){
    var seccion = document.getElementById("agregarTemaSeccion").value
    var seccionNueva = {"seccion":seccion, "contenido":[], "temas":[]}
    entrada.push(seccionNueva); 
   
   
    var seccion = entrada[entrada.length-1]["seccion"];
    var ele = document.createElement("a");
    ele.classList = "dropdown-item";
    ele.innerHTML = seccion;
    ele.id = "seccion" + (entrada.length);
    
    ele.onclick = function (){
        actualizarSeccion(this.innerHTML)
     };

    document.querySelector(".menu1").appendChild(ele);

    
    creaListas(seccion, entrada.length);
    
}

function botonAgregaTema(){

    var tema = document.getElementById("agregarSubTema").value
    var temaNuevo = {"tema":tema, "contenido":[], "subtemas":[]}

    entrada[seccionSeleccionada]["temas"].push(temaNuevo);
    var largo = entrada[seccionSeleccionada]["temas"].length
    var seccion = entrada[seccionSeleccionada]["temas"][largo-1];

    var ele = document.createElement("a");
    ele.classList = "dropdown-item";
    ele.innerHTML = entrada[seccionSeleccionada]["temas"][largo-1]["tema"];
    ele.id = "tema" + (largo);
    
    ele.onclick = function (){
        actualizarTema(this.innerHTML,seccionSeleccionada)
     };

    document.querySelector(".menu2").appendChild(ele);

    
    creaListas(entrada[seccionSeleccionada]["temas"][largo-1]["tema"], largo-1);


   
   
   
   
}

function botonAgregaSubTema(){
    var subTema = document.getElementById("agregarSubTemaTitulo").value;
    var subTemaNuevo = {"subtema":subTema, "contenido":[]}

    entrada[seccionSeleccionada]["temas"][temaSeleccionado]["subtemas"].push(subTemaNuevo);
  
    var largo = entrada[seccionSeleccionada]["temas"][temaSeleccionado]["subtemas"].length

    var ele = document.createElement("a");
    ele.classList = "dropdown-item";
    ele.innerHTML = entrada[seccionSeleccionada]["temas"][temaSeleccionado]["subtemas"][largo-1]["subtema"];
    ele.id = "subtema" + largo;
                
    ele.onclick = function (){
            actualizarSubTema(this.innerHTML, temaSeleccionado, seccionSeleccionada)
        };
            
    document.querySelector(".menu3").appendChild(ele);
                
    creaListas(entrada[seccionSeleccionada]["temas"][temaSeleccionado]["subtemas"][largo-1]["subtema"], largo-1);
            
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
function actualizarTema(item, tema) {
    document.getElementById("dropdownMenuButton2").innerHTML = item;

    //ACTUALIZA LISTA CON TEMA
    var i = 0;
   
    for(i; i < entrada[tema]["temas"].length; i++){
        if(item == entrada[tema]["temas"][i]["tema"]){
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
   
    for(i; i < entrada[seccion]["temas"][tema]["subtemas"].length; i++){
        if(item == entrada[seccion]["temas"][tema]["subtemas"][i]["subtema"]){
            break;
        }
    }

    cargaFinal(seccion, tema, i);
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

    document.getElementById("archivoSeccion").value = '';
}

function activaDesactivaTemas(estado){
    document.getElementById("agregarArchivoSeccion").disabled = estado;
    document.getElementById("archivoSeccion").disabled = estado;
    document.getElementById("dropdownMenuButton2").disabled = estado;
    document.getElementById("dropdownMenuButton2").innerHTML = "Seleccionar Tema";
    document.getElementById("botonAgregarTema").disabled = estado;
    document.getElementById("agregarSubTema").disabled = estado;
    document.getElementById("agregarSubTema").value = '';
   
    document.getElementById("archivoTema").value = '';
}

function activaDesactivaSubTemas(estado){
    document.getElementById("agregarArchivoTema").disabled = estado;
    document.getElementById("archivoTema").disabled = estado;
    document.getElementById("dropdownMenuButton3").disabled = estado;
    document.getElementById("dropdownMenuButton3").innerHTML = "Seleccionar Sub-Tema";
    document.getElementById("agregarArchivoSubTema").disabled = estado;
    document.getElementById("archivoSubTema").disabled = estado;
    document.getElementById("archivoSubTema").value = '';
    document.getElementById("botonAgregarSubTema").disabled = estado;
    document.getElementById("agregarSubTemaTitulo").disabled = estado;
    document.getElementById("agregarSubTemaTitulo").value = '';
}
