
function cargarPagina(){
    
    autenticar()
    //let usuarioJSON = localStorage.getItem("usuario");
    //var usuario = JSON.parse(usuarioJSON);
    //var nombre = usuario.nombre;
    //console.log(usuario);
    //console.log(usuario.nombre);
    //document.getElementById("nombreProfesor").textContent = nombre;
    document.getElementById("nombreProfesor").textContent = localStorage.getItem("usuario");
    
    cargarCursosProfesor()


    document.addEventListener("DOMContentLoaded", cargarPagina);
}

function cargarCursosProfesor(){
    //pedirCursos()
    //---BORRAR
    var cursosEst = [{"curso":"Bases de datos","estado":"Disponible","codigo":"IC-500"},
              {"curso":"Bases de datos 2", "estado":"Finalizado","codigo":"IC-785"}, 
              {"curso":"Lenguajes de programacion", "estado":"En curso","codigo":"HI-200"}]
    localStorage.setItem("cursos", JSON.stringify(cursosEst))
    //---BORRAR
    let cursos = JSON.parse(localStorage.getItem("cursos"));
    for(var i = 0; i < cursos.length; i++){
        
        var idCurso = "curso";
        var idEstado = "estado";
        

        creaListas(cursos[i][idCurso], cursos[i][idEstado], i);

    }
}

function pedirCursos(){

    var nombreDeUsuario = JSON.parse(localStorage.getItem("usuario")).username;
    let datosRecibidos;
    // Hacer la solicitud GET al servidor
    fetch('http://localhost:3000/Usuario/'+nombreDeUsuario)
    .then(response => {
        if (!response.ok) {
            alert('No se pudo obtener la información del usuario');
        }
        return response.json(); // Parsea la respuesta JSON
    })
    .then(data => {
        // Datos recibidos
        datosRecibidos = data;
        localStorage.setItem("cursos", JSON.stringify(datosRecibidos))

    })
    .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
    });
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
    var cursos = JSON.parse(localStorage.getItem("cursos"));
   
    for(var i = 0; i < cursos.length; i++ ){

        if(cursoActual == cursos[i]["curso"]){
            localStorage.setItem("codigoCursoActual", cursos[i]["codigo"])
        }
    }
    
    localStorage.setItem("cursoActual", cursoActual);
    location.href = "curso.html";
}