
//FUNCION EN CREAR USUARIO
function cambiaTexto(){
    
    if(localStorage.getItem("estudiante")  == "v"){
        document.getElementById("inputUsuario").placeholder = "Usuario @estudiantec.cr";
    }
    else{
        document.getElementById("inputUsuario").placeholder = "Usuario @itcr.cr";
    }

    if(localStorage.getItem("conexion") == "PROFE" || localStorage.getItem("conexion") == "ESTUD"){
        let usuarioConectado = localStorage.getItem("usuario");
        document.getElementById("titulo").textContent = "EDITA TUS DATOS";
        let inputUsuario = document.getElementById("inputUsuario");
        inputUsuario.placeholder = localStorage.getItem("usuario");
        inputUsuario.required = false;
        inputUsuario.readOnly = true;

        //RELLENAR CON DATOS DEL USUARIO TOMADAS DEL LOCALSTORAGE
        document.getElementById("inputUsuario").value       = usuarioConectado.usuario;
        document.getElementById("inputPrimNombre").value    = usuarioConectado.priNombre;
        document.getElementById("inputSegNombre").value     = usuarioConectado.segNombre;
        document.getElementById("inputPrimApellido").value  = usuarioConectado.priApellido;
        document.getElementById("inputSegApellido").value   = usuarioConectado.segApellido;
        document.getElementById("birthday").value           = usuarioConectado.fecNac;
        document.getElementById("myImg").value              = usuarioConectado.img;
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
                    //GUARDA EN BASE DE DATOS
                    fetch('http://localhost:3000/RegistrarEstudiante', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: datosUsuarioJSON
                    })
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
                    //Convierte en JSON
                    let datosUsuario = {
                        usuario: usuario,
                        contrasena: contrasena,
                        salt: "basico",
                        primNombre: primNombre,
                        segNombre: segNombre,
                        primApellido: primApellido,
                        segApellido: segApellido,
                        fecNac: fecNac,
                        img: img
                    };
                    let datosUsuarioJSON = JSON.stringify(datosUsuario);
                    //GUARDA EN BASE DE DATOS
                    fetch('http://localhost:3000/RegistrarProfesor', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: datosUsuarioJSON
                    })
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
                    //Convierte en JSON
                    let datosUsuario = {
                        usuario: usuario,
                        contrasena: contrasena,
                        salt: "basico",
                        primNombre: primNombre,
                        segNombre: segNombre,
                        primApellido: primApellido,
                        segApellido: segApellido,
                        fecNac: fecNac,
                        img: img
                    };
                    let datosUsuarioJSON = JSON.stringify(datosUsuario);
                    //ACTUALIZA EN BASE DE DATOS

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
                    //Convierte en JSON
                    let datosUsuario = {
                        usuario: usuario,
                        contrasena: contrasena,
                        salt: "basico",
                        primNombre: primNombre,
                        segNombre: segNombre,
                        primApellido: primApellido,
                        segApellido: segApellido,
                        fecNac: fecNac,
                        img: img
                    };
                    let datosUsuarioJSON = JSON.stringify(datosUsuario);
                    //ACTUALIZA EN BASE DE DATOS
                    
                }else{
                    alert("Las contraseñas no coinciden")
                }
            }else{
                alert("Entradas inválidas")
            }
        }

    });
});
