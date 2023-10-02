document.addEventListener("DOMContentLoaded", cargarPagina);
var estadoAmistad = false;

function cargarPagina(){
    
    autenticar()
    let usuarioJSON = localStorage.getItem("usuario");
    var usuario = JSON.parse(usuarioJSON);
    var nombre = usuario.nombre;
    document.getElementById("nombreProfesor").textContent = nombre;
    
    
    cargarUsuario();

}

function cargarUsuario(){
    var nombreDeUsuario = localStorage.getItem("usernamePersonaVisitada");
    let inputUsuario;
    // Hacer la solicitud GET al servidor
    console.log(nombreDeUsuario);
    fetch('http://localhost:3000/Usuario/'+nombreDeUsuario)
    .then(response => {
        if (!response.ok) {
            console.log("No se pudo obtener la información del usuario");
        }
        return response.json(); // Parsea la respuesta JSON
    })
    .then(data => {
        // Datos recibidos
        inputUsuario = data;
        if (inputUsuario.error != 'Usuario no encontrado'){
            localStorage.setItem("usuarioVisitado", JSON.stringify(inputUsuario));
            let usuarioJSON = localStorage.getItem("usuarioVisitado");
            var usuario = JSON.parse(usuarioJSON);
            document.getElementById("labelNombre").textContent = usuario.nombre + " " + usuario.segundonombre + " " + usuario.primerapellido + " " + usuario.segundoapellido;
            document.getElementById("labelCorreo").textContent = usuario.username;
            pedirCursosLlevadosYCursosImpartidos();
            pedirAmigos();
        }
    })
    .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
    });
    //-------------------------get profesor--------------------
    fetch('http://localhost:3000/Profesor/'+nombreDeUsuario)
    .then(response => {
        if (!response.ok) {
            console.log("No se pudo obtener la información del usuario");
        }
        return response.json(); // Parsea la respuesta JSON
    })
    .then(data => {
        // Datos recibidos
        inputUsuario = data;
        if (inputUsuario.error != 'Usuario no encontrado'){
            localStorage.setItem("usuarioVisitado", JSON.stringify(inputUsuario));
            let usuarioJSON = localStorage.getItem("usuarioVisitado");
            var usuario = JSON.parse(usuarioJSON);
            document.getElementById("labelNombre").textContent = usuario.nombre + " " + usuario.segundonombre + " " + usuario.primerapellido + " " + usuario.segundoapellido;
            document.getElementById("labelCorreo").textContent = usuario.username;
            pedirCursosLlevadosYCursosImpartidos();
            pedirAmigos();
        }
    })
    .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
    });
}

function pedirAmigos(){
  var nombreDeUsuario = JSON.parse(localStorage.getItem("usuario"));
  let datosRecibidos;
  // Hacer la solicitud GET al servidor
  fetch('http://localhost:3000/buscarAmigos/'+nombreDeUsuario.username)
  .then(response => {
      if (!response.ok) {
          alert('No se pudo obtener la información del usuario');
      }
      return response.json(); // Parsea la respuesta JSON
  })
  .then(data => {
      // Datos recibidos
      datosRecibidos = data;
      localStorage.setItem("amigos", JSON.stringify(datosRecibidos));
      actualizarEstadoBoton();
  })
  .catch(error => {
      console.error('Error al obtener la información del usuario:', error);
  });
}

function actualizarEstadoBoton(){

  var nombreDeUsuario = localStorage.getItem("usernamePersonaVisitada");
  let listaAmigos = JSON.parse(localStorage.getItem("amigos"));

  //EL FETCH NO DICE QUE SON AMIGOS, PONER BOTON AGREGAR AMIGO
  document.getElementById("btnAmigo").onclick = agregarAmigo;
  document.getElementById("btnAmigo").textContent = "Agregar amigo";
  estadoAmistad = false;

  for(var i = 0; i < listaAmigos.length; i++){
      console.log("amigo:" +listaAmigos[i].username );
      console.log("visitado"+ nombreDeUsuario);
      if(listaAmigos[i].username == nombreDeUsuario){
          //EL FETCH DICE QUE SON AMIGOS, PONER BOTON ELIMINAR AMIGO
          document.getElementById("btnAmigo").onclick = eliminarAmigo;
          document.getElementById("btnAmigo").textContent = "Eliminar amigo";
          estadoAmistad = true;
      }
  }

}

function eliminarAmigo(){
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    let amigo = JSON.parse(localStorage.getItem("usuarioVisitado"));

    let datosUsuarioJSON = {
        "username1": usuario.username,
        "username2": amigo.username
    };

    fetch('http://localhost:3000/eliminarAmigos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosUsuarioJSON)
    });

    document.getElementById("btnAmigo").onclick = agregarAmigo;
    document.getElementById("btnAmigo").textContent = "Agregar amigo";
    estadoAmistad = false;
    alert("Se han eliminado los amigos con éxito");
}

function agregarAmigo(){
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    let amigo = JSON.parse(localStorage.getItem("usuarioVisitado"));

    let datosUsuarioJSON = {
        "username1": usuario.username,
        "username2": amigo.username
    };

    fetch('http://localhost:3000/anadirAmigos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosUsuarioJSON)
    })
    document.getElementById("btnAmigo").onclick = eliminarAmigo;
    document.getElementById("btnAmigo").textContent = "Eliminar amigo";
    estadoAmistad = true;
    alert("Se han añadido los amigos con éxito");
}

function imprimirDatos(){
    if(estadoAmistad){
        let cursosLlevaJSON = localStorage.getItem("cursosLlevados");
        let cursosImparteJSON = localStorage.getItem("cursosImpartidos");
        if (cursosLlevaJSON !== null){
            let cursosLleva = JSON.parse(cursosLlevaJSON);
            for(var i = 0; i < cursosLleva.length; i++){
            
                var idCurso = "nombre";
                var idEstado = "estado";
                
                creaListas(cursosLleva[i][idCurso], cursosLleva[i][idEstado], i, ".cuerpoTablaLleva");
        
            }
        }
        if (cursosImparteJSON !== null){
            let cursosImparte = JSON.parse(cursosImparteJSON);
            for(var i = 0; i < cursosImparte.length; i++){
            
                var idCurso = "nombre";
                var idEstado = "estado";
                
                creaListas(cursosImparte[i][idCurso], cursosImparte[i][idEstado], i, ".cuerpoTablaImparte");
        
            }
        }
    }else{
        alert("Ustedes no son amigos, no puede ver sus cursos");
    }
}

function pedirCursosLlevadosYCursosImpartidos(){
    let usuarioJSON = localStorage.getItem("usuarioVisitado");
    var usuario = JSON.parse(usuarioJSON);
    var nombreDeUsuario = usuario.username;
    let datosRecibidos;
    //-----------------------MATERIAS MATRICULADAS POR USUARIO
    // Hacer la solicitud GET al servidor
    fetch('http://localhost:3000/MateriasMatriculadas/'+nombreDeUsuario)
    .then(response => {
        if (!response.ok) {
            console.log('No se pudieron obtener cursos matriculados por el usuario');
        }
        return response.json(); // Parsea la respuesta JSON
    })
    .then(data => {
        // Datos recibidos
        datosRecibidos = data;
        localStorage.setItem("cursosLlevados", JSON.stringify(datosRecibidos))
        
    })
    .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
    });

    //-----------------------MATERIAS IMPARTIDAS POR USUARIO
    // Hacer la solicitud GET al servidor
    fetch('http://localhost:3000/CursosProfesor/'+nombreDeUsuario)
    .then(response => {
        if (!response.ok) {
            console.log('No se pudieron obtener cursos impartidos por el usuario');
        }
        return response.json(); // Parsea la respuesta JSON
    })
    .then(data => {
        // Datos recibidos
        datosRecibidos = data;
        localStorage.setItem("cursosImpartidos", JSON.stringify(datosRecibidos))

    })
    .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
    });
}


function creaListas(contenido,estado,cantidad,classTabla){

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
    document.querySelector(classTabla).appendChild(tr)
}