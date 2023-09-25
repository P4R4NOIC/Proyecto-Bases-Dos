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
    
 
    if (email.match(correoEstudianteValido) != null && contrasena != "")
    {
        // -- AQUI VA A IR LA VALIDACION CON LA BASE DE DATOS DE UN ESTUDIANTE CORRECTO -- //

        // ------------------------------------------------------------------------------- //
        
        location.href = "../../Archivos HTML/Archivos Estudiante/lobbyEstudiante.html"
      
    } 
    else if(email.match(correoProfesorValido) != null && contrasena != ""){
        // -- AQUI VA A IR LA VALIDACION CON LA BASE DE DATOS DE UN ESTUDIANTE CORRECTO -- //

        // ------------------------------------------------------------------------------- //
        localStorage.setItem("usuario", email)
        location.href = "../../Archivos HTML/Archivos Profesor/lobbyProfesor.html"
    }
    
    else {
        var myModalEl = document.querySelector('#myModal')
        var modal = bootstrap.Modal.getOrCreateInstance(myModalEl)
        modal.show()
        document.getElementById("inputEmail").value = ""
        document.getElementById("inputPassword").value = ""
    }
}