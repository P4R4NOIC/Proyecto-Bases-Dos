
//FUNCION EN CREAR USUARIO
function cambiaTexto(){
    
    if(localStorage.getItem("estudiante")  == "v"){
        document.getElementById("inputUsuario").placeholder = "Usuario @estudiantec.cr";
    }
    else{
        document.getElementById("inputUsuario").placeholder = "Usuario @itcr.cr";
    }

    if(localStorage.getItem("conexion") == "PROFE" || localStorage.getItem("conexion") == "ESTUD"){
        const usuarioConectado = localStorage.getItem("usuario");
        document.getElementById("titulo").textContent = "EDITA TUS DATOS";
        const inputUsuario = document.getElementById("inputUsuario");
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
    const formulario = document.getElementById("formulario");

    formulario.addEventListener ("submit", function(event) {
        //EVITA QUE SE ENVIE
        event.preventDefault();
        //-----------------//
        var correoEstudianteValido = /^[a-zA-Z0-9_-]+(@estudiantec.cr)$/;
        var correoProfesorValido = /^[a-zA-Z0-9_-]+(@itcr.ac.cr)$/;
        var png = /^[\s\S]*(.png)$/;
        var jpg = /^[\s\S]*(.jpg)$/;

        const usuario = document.getElementById("inputUsuario").value;
        const contrasena = document.getElementById("inputContraseña").value;
        const contraConfirma = document.getElementById("inputConfContraseña").value;
        const primNombre = document.getElementById("inputPrimNombre").value;
        const segNombre = document.getElementById("inputSegNombre").value;
        const primApellido = document.getElementById("inputPrimApellido").value;
        const segApellido = document.getElementById("inputSegApellido").value;
        const fecNac = document.getElementById("birthday").value;
        const img = document.getElementById("myImg").value;
        
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
                    const datosUsuario = {
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
                    const datosUsuarioJSON = JSON.stringify(datosUsuario);
                    //GUARDA EN BASE DE DATOS
                    fetch('http://localhost:3000/RegistrarUsuario',{
                        method: 'Post',
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

        if (localStorage.getItem("estudiante")  == "f"){
            if(correoProfesorValido.test(usuario)  && contrasena != "" && contraConfirma != "" && primNombre != "" && primApellido != "" && fecNac != "" && 
            (png.test(img) != null || jpg.test(img) != null || img == "")){
                if(contrasena == contraConfirma){
                    //Convierte en JSON
                    const datosUsuario = {
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
                    const datosUsuarioJSON = JSON.stringify(datosUsuario);
                    //GUARDA EN BASE DE DATOS
                    fetch('http://localhost:3000/RegistrarUsuario',{
                        method: 'Post',
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

        if(localStorage.getItem("conexion") == "PROFE"){
            if(contrasena != "" && contraConfirma != "" && primNombre != "" && primApellido != "" && fecNac != "" && 
            (png.test(img) != null || jpg.test(img) != null || img == "")){
                if(contrasena == contraConfirma){
                    //Convierte en JSON
                    const datosUsuario = {
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
                    const datosUsuarioJSON = JSON.stringify(datosUsuario);
                    //ACTUALIZA EN BASE DE DATOS
                    
                }else{
                    alert("Las contraseñas no coinciden")
                }
            }else{
                alert("Entradas inválidas")
            }
        }

        if(localStorage.getItem("conexion") == "ESTUD"){
            if(contrasena != "" && contraConfirma != "" && primNombre != "" && primApellido != "" && fecNac != "" && 
            (png.test(img) != null || jpg.test(img) != null || img == "")){
                if(contrasena == contraConfirma){
                    //Convierte en JSON
                    const datosUsuario = {
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
                    const datosUsuarioJSON = JSON.stringify(datosUsuario);
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
