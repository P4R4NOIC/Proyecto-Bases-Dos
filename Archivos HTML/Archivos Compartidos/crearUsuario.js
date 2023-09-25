
//FUNCION EN CREAR USUARIO
function cambiaTexto(){

    if(localStorage.getItem("estudiante")  == "v"){
        document.getElementById("inputUsuario").placeholder = "Usuario @estudiantec.cr";
    }
    else{
        document.getElementById("inputUsuario").placeholder = "Usuario @itcr.cr";
    }

}

function validaUsuario(){
    var correoEstudianteValido = /^[a-zA-Z0-9_-]+(@estudiantec.cr)$/;
    var correoProfesorValido = /^[a-zA-Z0-9_-]+(@itcr.ac.cr)$/;
    var png = /^[\s\S]*(.png)$/;
    var jpg = /^[\s\S]*(.jpg)$/;

    var usuario = document.getElementById("inputUsuario").value;
    var contrasena = document.getElementById("inputContraseña").value;
    var contraConfirma = document.getElementById("inputConfContraseña").value;
    var primNombre = document.getElementById("inputPrimNombre").value;
    var primApellido = document.getElementById("inputPrimApellido").value;
    var fecNac = document.getElementById("birthday").value;
    var img = document.getElementById("myImg").value;
   
    if(localStorage.getItem("estudiante")  == "v"){
       
        if(usuario.match(correoEstudianteValido != null)  && contrasena != "" && contraConfirma != "" && primNombre != "" && primApellido != "" && fecNac != "" && 
        (img.match(png) != null || img.match(jpg) != null || img == "")){
            if(contrasena == contraConfirma){
                //mandar a pagina de estudiante
            }
        }
    }

    else{
        if(usuario.match(correoProfesorValido != null)  && contrasena != "" && contraConfirma != "" && primNombre != "" && primApellido != "" && fecNac != "" && 
        (img.match(png) != null || img.match(jpg) != null || img == "")){
            if(contrasena == contraConfirma){
                //mandar a pagina de profesor
            }
        }
    }

}


