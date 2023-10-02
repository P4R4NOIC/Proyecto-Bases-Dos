document.addEventListener("DOMContentLoaded", cargarPagina);

var correo = {"idRemitente":"",
              "idDestinatario":"",
              "asunto":"",
              "correo":""} 


function cargarPagina(){
    //FUNCION DE AUTENTICACION DE USUARIO
    
    autenticar()
    
    let usuarioJSON = localStorage.getItem("usuario");
    cargaRemitente();
    var usuario = JSON.parse(usuarioJSON);
    var nombre = usuario.nombre;
    document.getElementById("nombreProfesor").textContent = nombre;
    //CARGA LA PAGINA CUANDO TODO ESTA LISTO
    
}

function cargaRemitente(){
    document.getElementById("de").placeholder = JSON.parse(localStorage.getItem("usuario"))["username"];
    document.getElementById("de").disabled = true;
}

document.addEventListener("DOMContentLoaded", function () {
    let formulario = document.getElementById("formulario");

    formulario.addEventListener ("submit", function(event) {
        //EVITA QUE SE ENVIE
        event.preventDefault();
        
        var remitente = JSON.parse(localStorage.getItem("usuario"))["username"];
        var destinatario = document.getElementById("para").value;
        var asunto = document.getElementById("asunto").value;
        var correoCuerpo = document.getElementById("mensaje").value;
        
        let datosMensaje = {
            idRemitente: remitente,
            idDestinatario: destinatario,
            asunto: asunto,
            correo: correoCuerpo
        };
        
        let datosMensajeJSON = JSON.stringify(datosMensaje);
        console.log(datosMensajeJSON);
        guardarMensaje(datosMensajeJSON);
        alert("Su mensaje ha sido enviado con exito.");
        location.href = "mensajesVistaProfe.html";
        
        
    })
});

function guardarMensaje(correo){
    fetch('http://localhost:3000/GuardarDocumento/Correos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: correo
    })
}