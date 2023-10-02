
function cargarPagina(tipo){
    
    autenticar()
    let usuarioJSON = localStorage.getItem("usuario");
    var usuario = JSON.parse(usuarioJSON);
    var nombre = usuario.nombre;
    if(localStorage.getItem("conexion") == "PROFE"){
        document.getElementById("nombreProfesor").textContent = nombre;
    }
    if(localStorage.getItem("conexion") == "ESTUD"){
        document.getElementById("nombreEstudiante").textContent = nombre;
    }
    if(tipo=="todos"){
        pedirPersonas();
    }
    if(tipo=="amigos"){
        pedirAmigos();
    }

    
}

function cargarPersonas(){

    let todosProfes = JSON.parse(localStorage.getItem("todosProfes"));
    let todosEstudiantes = JSON.parse(localStorage.getItem("todosEstudiantes"));
    for (i = 0; i < todosProfes.length; i++) {
        var persona = todosProfes[i].nombre + " " + todosProfes[i].segundonombre + " " + todosProfes[i].primerapellido + " " + todosProfes[i].segundoapellido ;
        var ele = document.createElement("a")
        ele.classList = "personas list-group-item list-group-item-dark"
        ele.href = "#";
        ele.role = "tab";
        ele.innerHTML = persona;
        ele.title = todosProfes[i].username;
        ele.onclick = function (){
            if(localStorage.getItem("conexion") == "PROFE"){
                guardaPersonaActual(this.title,"../Archivos Profesor/perfilUsuarioVistaProfe.html");
            }
            if(localStorage.getItem("conexion") == "ESTUD"){
                guardaPersonaActual(this.title,"../Archivos Estudiante/perfilUsuarioVistaEstudiante.html");
            }
            

        };
        document.querySelector(".listas").appendChild(ele);
    }

    for (i = 0; i < todosEstudiantes.length; i++) {
        var persona = todosEstudiantes[i].nombre + " " + todosEstudiantes[i].segundonombre + " " + todosEstudiantes[i].primerapellido + " " + todosEstudiantes[i].segundoapellido ;
        var ele = document.createElement("a")
        ele.classList = "personas list-group-item list-group-item-dark"
        ele.href = "#";
        ele.role = "tab";
        ele.innerHTML = persona;
        ele.title = todosEstudiantes[i].username;
        ele.onclick = function (){
            if(localStorage.getItem("conexion") == "PROFE"){
                guardaPersonaActual(this.title,"../Archivos Profesor/perfilUsuarioVistaProfe.html");
            }
            if(localStorage.getItem("conexion") == "ESTUD"){
                guardaPersonaActual(this.title,"../Archivos Estudiante/perfilUsuarioVistaEstudiante.html");
            }
            

        };
        document.querySelector(".listas").appendChild(ele);
    }
}

function pedirPersonas(){
    let datosRecibidosEstudiantes;
    let datosRecibidosProfes;
    // ------------------------------- FETCH ESTUDIANTES
    // ---------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------
    // Hacer la solicitud GET al servidor
    fetch('http://localhost:3000/Todos-Usuarios')
    .then(response => {
        if (!response.ok) {
            alert('No se pudo obtener la información del usuario');
        }
        return response.json(); // Parsea la respuesta JSON
    })
    .then(data => {
        // Datos recibidos
        datosRecibidosEstudiantes = data;
        localStorage.setItem("todosEstudiantes", JSON.stringify(datosRecibidosEstudiantes))
    })
    .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
    });
    // ------------------------------- FETCH PROFES
    // ---------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------
    // Hacer la solicitud GET al servidor
    fetch('http://localhost:3000/Todos-Profes')
    .then(response => {
        if (!response.ok) {
            alert('No se pudo obtener la información del usuario');
        }
        return response.json(); // Parsea la respuesta JSON
    })
    .then(data => {
        // Datos recibidos
        datosRecibidosProfes = data;
        localStorage.setItem("todosProfes", JSON.stringify(datosRecibidosProfes))
        cargarPersonas();
    })
    .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
    });
}

function pedirAmigos(){
    var nombreDeUsuario = JSON.parse(localStorage.getItem("usuario")).username;
    let datosRecibidos;
    // Hacer la solicitud GET al servidor
    fetch('http://localhost:3000/buscarAmigos/'+nombreDeUsuario)
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
        cargarAmigos();
    })
    .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
    });
}

function cargarAmigos(){

    let todosAmigos = JSON.parse(localStorage.getItem("amigos"));
    for (i = 0; i < todosAmigos.length; i++) {
        buscarPersonaActual(todosAmigos[i].username);
    }
}

function buscarPersonaActual(nombreDeUsuario){
    let inputUsuario;
    // Hacer la solicitud GET al servidor
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
            localStorage.setItem("amigoActual", JSON.stringify(inputUsuario));
            almacenarPersonaEnLista();
        }
    })
    .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
    });

    // Hacer la solicitud GET al servidor
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
            localStorage.setItem("amigoActual", JSON.stringify(inputUsuario));
            almacenarPersonaEnLista();
        }
    })
    .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
    });
}

function almacenarPersonaEnLista(){
    amigoActual = JSON.parse(localStorage.getItem("amigoActual"));
    
    var persona = amigoActual.nombre + " " + amigoActual.segundonombre + " " + amigoActual.primerapellido + " " + amigoActual.segundoapellido ;
    var ele = document.createElement("a")
    ele.classList = "personas list-group-item list-group-item-dark"
    ele.href = "#";
    ele.role = "tab";
    ele.innerHTML = persona;
    ele.title = amigoActual.username;
    ele.onclick = function (){
        if(localStorage.getItem("conexion") == "PROFE"){
            guardaPersonaActual(this.title,"../Archivos Profesor/perfilUsuarioVistaProfe.html");
        }
        if(localStorage.getItem("conexion") == "ESTUD"){
            guardaPersonaActual(this.title,"../Archivos Estudiante/perfilUsuarioVistaEstudiante.html");
        }            
    };
    document.querySelector(".listas").appendChild(ele);
}

function buscarPersona(){
    let input = document.getElementById('searchbar').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('personas');

    for (i =0; i < x.length; i++){
        if (!x[i].innerHTML.toLocaleLowerCase().includes(input)){
            x[i].style.display = "none";
        }
        else{
            x[i].style.display = "list-item";
        }
    }
}

function guardaPersonaActual(personaActual,direccion){
    localStorage.setItem("usernamePersonaVisitada", personaActual);
    location.href = direccion;    
}