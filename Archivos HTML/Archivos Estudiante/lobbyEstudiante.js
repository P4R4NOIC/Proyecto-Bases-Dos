var cursos = [{"curso":"Bases de datos","estado":"Disponible"},
              {"curso":"Bases de datos 2", "estado":"Finalizado"}, 
              {"curso":"Lenguajes de programacion", "estado":"En curso"}]


function cargarPagina(){
    
    autenticar()
    let usuarioJSON = localStorage.getItem("usuario");
    var usuario = JSON.parse(usuarioJSON);
    var nombre = usuario.nombre;
    console.log(usuario);
    console.log(usuario.nombre);
    document.getElementById("nombreEstudiante").textContent = nombre;



    for(var i = 0; i < cursos.length; i++){
        
        var idCurso = "curso";
        var idEstado = "estado";
        

        creaListas(cursos[i][idCurso], cursos[i][idEstado], i);
        
    }

    document.addEventListener("DOMContentLoaded", cargarPagina);
}


function creaListas(contenido,estado,cantidad){

    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.id = "estado" + (cantidad+1);
    td.textContent = estado;
    tr.classList = "filas";
    tr.id = "filas" 
    var th = document.createElement("th");
    th.scope = "row";
    var refer = document.createElement("a");
    refer.classList = "cursosH cursos";
    refer.id = "curso" + (cantidad+1); 
    refer.textContent = contenido;

    refer.onclick = function (){
        guardaCursoActual(this.innerHTML)
     };

    th.append(refer);
    tr.appendChild(th);
    tr.appendChild(td);
    document.querySelector(".cuerpoTabla").appendChild(tr)

}

function guardaCursoActual(cursoActual){
    localStorage.setItem("cursoActual", cursoActual);
    location.href = "cursoEstudiante.html";
}