function validaCorreo() {
       
    var email = document.getElementById("inputEmail").value
    var correoEstudianteValido = /^[\w-\.]+@(estudiantec.cr)$/
    var correoProfesorValido = /^[a-zA-Z0-9_-]+(@itcr.ac.cr)$/;
    var contrasena = document.getElementById("inputPassword").value
    
 
    if (email.match(correoEstudianteValido) != null && contrasena != "")
    {
        // -- AQUI VA A IR LA VALIDACION CON LA BASE DE DATOS DE UN ESTUDIANTE CORRECTO -- //

        // ------------------------------------------------------------------------------- //
        location.href = "lobbyEstudiante.html"
      
    } 
    else if(email.match(correoProfesorValido) != null && contrasena != ""){
        // -- AQUI VA A IR LA VALIDACION CON LA BASE DE DATOS DE UN ESTUDIANTE CORRECTO -- //

        // ------------------------------------------------------------------------------- //
        location.href = "lobbyProfesor.html"
    }
    
    else {
        var myModalEl = document.querySelector('#myModal')
        var modal = bootstrap.Modal.getOrCreateInstance(myModalEl)
        modal.show()
        document.getElementById("inputEmail").value = ""
        document.getElementById("inputPassword").value = ""
    }
}