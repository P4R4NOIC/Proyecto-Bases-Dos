
//FUNCION EN CREAR USUARIO
function cambiaTexto(){
    
    if(localStorage.getItem("estudiante")  == "v"){
        document.getElementById("inputUsuario").placeholder = "Usuario @estudiantec.cr";
    }
    else{
        document.getElementById("inputUsuario").placeholder = "Usuario @itcr.ac.cr";
    }

    if(localStorage.getItem("conexion") == "PROFE" || localStorage.getItem("conexion") == "ESTUD"){
        let usuarioConectado = JSON.parse(localStorage.getItem("usuario"));
        document.getElementById("titulo").textContent = "EDITA TUS DATOS";
        let inputUsuario = document.getElementById("inputUsuario");
        inputUsuario.placeholder = localStorage.getItem("usuario");
        inputUsuario.required = false;
        inputUsuario.readOnly = true;

        //RELLENAR CON DATOS DEL USUARIO TOMADAS DEL LOCALSTORAGE
        document.getElementById("inputUsuario").value       = usuarioConectado.username;
        document.getElementById("inputPrimNombre").value    = usuarioConectado.nombre;
        document.getElementById("inputSegNombre").value     = usuarioConectado.segundonombre;
        document.getElementById("inputPrimApellido").value  = usuarioConectado.primerapellido;
        document.getElementById("inputSegApellido").value   = usuarioConectado.segundoapellido;
        document.getElementById("birthday").value           = usuarioConectado.fechanacimiento;
        document.getElementById("myImg").value              = usuarioConectado.foto;
    }

}


// RECIBE EL FORMULARIO
document.addEventListener("DOMContentLoaded", function () {
    let formulario = document.getElementById("formulario");

    formulario.addEventListener ("submit", function(event) {
        //EVITA QUE SE ENVIE
        event.preventDefault();
        //-----------------//
        let correoEstudianteValido = /^[a-zA-Z0-9_-]+(@estudiantec.cr)$/;
        let correoProfesorValido = /^[a-zA-Z0-9_-]+(@itcr.ac.cr)$/;
        let png = /^[\s\S]*(.png)$/;
        let jpg = /^[\s\S]*(.jpg)$/;

        let usuario = document.getElementById("inputUsuario").value;
        let contrasena = document.getElementById("inputContraseña").value;
        let contraConfirma = document.getElementById("inputConfContraseña").value;
        let primNombre = document.getElementById("inputPrimNombre").value;
        let segNombre = document.getElementById("inputSegNombre").value;
        let primApellido = document.getElementById("inputPrimApellido").value;
        let segApellido = document.getElementById("inputSegApellido").value;
        let fecNac = document.getElementById("birthday").value;
        let img = document.getElementById("myImg").value;
        
        //Convierte en JSON
        let datosUsuario = {
            usuario: usuario,
            contrasena: contrasena,
            fecNac: fecNac,
            img: img,
            primNombre: primNombre,
            primApellido: primApellido,
            salt: "basico",
            segApellido: segApellido,
            segNombre: segNombre
        };
        let datosUsuarioJSON = JSON.stringify(datosUsuario);

        
        // REGISTRA USUARIOS COMO ESTUDIANTE
        if(localStorage.getItem("estudiante")  == "v"){
            if(
            correoEstudianteValido.test(usuario)  && 
            contrasena != "" && 
            contraConfirma != "" && 
            primNombre != "" && 
            primApellido != "" && 
            fecNac != "" && 
            (png.test(img) != null || jpg.test(img) != null || img == "")){
                if(contrasena == contraConfirma){
                    //GUARDA EN BASE DE DATOS
                    //registrarEstudiante(datosUsuarioJSON);
                    alert("Sus datos han sido guardados")
                    history.back();
                }else{
                    alert("Las contraseñas no coinciden")
                }
            }else{
                alert("Entradas inválidas")
            }
        }
        // REGISTRA USUARIOS COMO PROFESOR
        if (localStorage.getItem("estudiante")  == "f"){
            if(correoProfesorValido.test(usuario)  && contrasena != "" && contraConfirma != "" && primNombre != "" && primApellido != "" && fecNac != "" && 
            (png.test(img) != null || jpg.test(img) != null || img == "")){
                if(contrasena == contraConfirma){
                    //GUARDA EN BASE DE DATOS
                    //registrarProfesor(datosUsuarioJSON);
                    alert("Sus datos han sido guardados")
                    history.back();
                }else{
                    alert("Las contraseñas no coinciden")
                }
            }else{
                alert("Entradas inválidas")
            }
        }

        // ACTUALIZA PROFESORES
        if(localStorage.getItem("conexion") == "PROFE"){
            if(contrasena != "" && contraConfirma != "" && primNombre != "" && primApellido != "" && fecNac != "" && 
            (png.test(img) != null || jpg.test(img) != null || img == "")){
                if(contrasena == contraConfirma){
                    //ACTUALIZA EN BASE DE DATOS
                    //actualizarProfesor(datosUsuarioJSON);
                    alert("Sus datos han sido actualizado")
                    history.back();

                }else{
                    alert("Las contraseñas no coinciden")
                }
            }else{
                alert("Entradas inválidas")
            }
        }

        // ACTUALIZA ESTUDIANTES
        if(localStorage.getItem("conexion") == "ESTUD"){
            if(contrasena != "" && contraConfirma != "" && primNombre != "" && primApellido != "" && fecNac != "" && 
            (png.test(img) != null || jpg.test(img) != null || img == "")){
                if(contrasena == contraConfirma){
                    //ACTUALIZA EN BASE DE DATOS
                    //actualizarEstudiante(datosUsuarioJSON);
                    alert("Sus datos han sido actualizado")
                    history.back();
                }else{
                    alert("Las contraseñas no coinciden")
                }
            }else{
                alert("Entradas inválidas")
            }
        }

    });
});

function registrarEstudiante(datosUsuarioJSON){
    fetch('http://localhost:3000/RegistrarEstudiante', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: datosUsuarioJSON
    })
}

function registrarProfesor(datosUsuarioJSON){
    fetch('http://localhost:3000/RegistrarProfesor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: datosUsuarioJSON
    })
}

function actualizarProfesor(datosUsuarioJSON){
    
}

function actualizarEstudiante(datosUsuarioJSON){

}