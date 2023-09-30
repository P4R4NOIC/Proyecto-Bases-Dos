document.addEventListener("DOMContentLoaded", cargarPagina);

function cargarPagina(){
    autenticar();
    let usuarioJSON = localStorage.getItem("usuario");
    var usuario = JSON.parse(usuarioJSON);
    var nombre = usuario.nombre;
    document.getElementById("nombreProfesor").textContent = nombre;
    cargarMensajes();
}

function cargarMensajes(){

}

function cargarEnviados(){
    // Objeto JSON
    var correo = {
        "remitente": "nombre.remitente@gmail.com",
        "destinatario": "nombre.destinatario@gmail.com",
        "asunto": "Asunto del correo",
        "mensaje": "Este es el mensaje del correo electrónico."
    };
    
    // Crear una cadena de texto con el formato deseado
    var formattedJsonString = `
    Remitente: ${correo.remitente}
    Destinatario: ${correo.destinatario}
    Asunto: ${correo.asunto}
    Mensaje: ${correo.mensaje}
    `;
    
    // Asignar la cadena formateada al valor del textarea
    document.getElementById("textArea").value = formattedJsonString;
  
    
}

function cargarRecibidos(){

}
