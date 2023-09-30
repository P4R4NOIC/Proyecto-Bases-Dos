//FUNCION EN LOGIN
function estudianteTrue(){
    localStorage.setItem("estudiante", "v");
}

//FUNCION EN LOGIN
function estudianteFalse(){
    localStorage.setItem("estudiante", "f");
}

//FUNCION EN LOGIN
function validaCorreo() {
       
    var email = document.getElementById("inputEmail").value
    var correoEstudianteValido = /^[\w-\.]+@(estudiantec.cr)$/
    var correoProfesorValido = /^[a-zA-Z0-9_-]+(@itcr.ac.cr)$/;
    var contrasena = document.getElementById("inputPassword").value
    
    if (correoEstudianteValido.test(email)){
        //logInEstudiante(email,contrasena);
    }

    if (correoProfesorValido.test(email)){
        //logInProfesor(email,contrasena);
    }

    //BORRAR-----------------------
    if (correoEstudianteValido.test(email) && contrasena != "")
    {
        localStorage.setItem("conexion", "ESTUD")
        localStorage.setItem("usuario", email)
        location.href = "../../Archivos HTML/Archivos Estudiante/lobbyEstudiante.html"
        // ------------------------------------------------------------------------------- //
      
    } 
    else if(correoProfesorValido.test(email) && contrasena != ""){
        localStorage.setItem("conexion", "PROFE")
        localStorage.setItem("usuario", email)
        location.href = "../../Archivos HTML/Archivos Profesor/lobbyProfesor.html"
        // ------------------------------------------------------------------------------- //
    }
    //BORRAR------------------------
    
}

function logInEstudiante(email,contrasena){
    var nombreDeUsuario = email;
    let inputUsuario;
    // Hacer la solicitud GET al servidor
    fetch('http://localhost:3000/Usuario/'+nombreDeUsuario)
    .then(response => {
        if (!response.ok) {
            activarModalError("No se pudo obtener la información del usuario");
        }
        return response.json(); // Parsea la respuesta JSON
    })
    .then(data => {
        // Datos recibidos
        inputUsuario = data;
        localStorage.setItem("usuario", JSON.stringify(inputUsuario))
        
        let usuarioJSON = localStorage.getItem("usuario");
        var usuario = JSON.parse(usuarioJSON);
        var contraUsuario = usuario.contra; 
        if(contrasena === contraUsuario){
            localStorage.setItem("conexion", "ESTUD")
            location.href = "../../Archivos HTML/Archivos Estudiante/lobbyEstudiante.html"
        }else{
            localStorage.removeItem("usuario");
            activarModalError("La contraseña o el usuario son invalidos");
        }
        

    })
    .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
    });
}

function activarModalError(error){
    var myModalEl = document.querySelector('#myModal')
    var modal = bootstrap.Modal.getOrCreateInstance(myModalEl)
    modal.show()
    document.getElementById("inputEmail").value = ""
    document.getElementById("inputPassword").value = ""
    var textoModal = document.querySelector(".modal-body");
    textoModal.textContent = error;
}

function logInProfesor(email,contrasena){
    var nombreDeUsuario = email;
    let inputUsuario;
    // Hacer la solicitud GET al servidor
    fetch('http://localhost:3000/Profesor/'+nombreDeUsuario)
    .then(response => {
        if (!response.ok) {
            activarModalError("No se pudo obtener la información del usuario");
        }
        return response.json(); // Parsea la respuesta JSON
    })
    .then(data => {
        // Datos recibidos
        inputUsuario = data;
        localStorage.setItem("usuario", JSON.stringify(inputUsuario))
        
        let usuarioJSON = localStorage.getItem("usuario");
        var usuario = JSON.parse(usuarioJSON);
        var contraUsuario = usuario.contra; 
        if(contrasena === contraUsuario){
            localStorage.setItem("conexion", "PROFE")
            location.href = "../../Archivos HTML/Archivos Profesor/lobbyProfesor.html"
        }else{
            localStorage.removeItem("usuario");
            activarModalError("La contraseña o el usuario son invalidos");
        }

    })
    .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
    });
}