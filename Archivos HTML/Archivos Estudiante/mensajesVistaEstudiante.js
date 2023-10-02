document.addEventListener("DOMContentLoaded", cargarPagina);
var estadoRecibidos = true;
var estadoEnviados = true;

function cargarPagina(){
    autenticar();
    let usuarioJSON = localStorage.getItem("usuario");
    var usuario = JSON.parse(usuarioJSON);
    var nombre = usuario.nombre;
    document.getElementById("nombreEstudiante").textContent = nombre;
    cargarMensajes();

}

function cargarMensajes(){
    let usuarioJSON = localStorage.getItem("usuario");
    var usuario = JSON.parse(usuarioJSON);
    var nombreDeUsuario = usuario.username;
    let datosRecibidos;

    //GUARDAR CORREOS ENVIADOS
    fetch('http://localhost:3000/consultarCorreosEnviados/'+nombreDeUsuario)
    .then(response => {
        if (!response.ok) {
            alert('No se pudo obtener la información del usuario');
        }
        return response.json(); // Parsea la respuesta JSON
    })
    .then(data => {
        // Datos recibidos
        datosRecibidos = data;
        localStorage.setItem("correosEnviados", JSON.stringify(datosRecibidos));
    })
    .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
    });

    //GUARDAR CORREOS RECIBIDOS
    fetch('http://localhost:3000/consultarCorreosRecibidos/'+nombreDeUsuario)
    .then(response => {
        if (!response.ok) {
            alert('No se pudo obtener la información del usuario');
        }
        return response.json(); // Parsea la respuesta JSON
    })
    .then(data => {
        // Datos recibidos
        datosRecibidos = data;
        localStorage.setItem("correosRecibidos", JSON.stringify(datosRecibidos));
    })
    .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
    });
}



function cargarEnviados(){
    
    let correos = JSON.parse(localStorage.getItem("correosEnviados"));
    if(estadoEnviados){
        limpiarContenedor("list-tab");
        limpiarContenedor("nav-tabContent");
        for(var i = 0; i < correos.length; i++){
        
            creaMensajes(correos[i].asunto, i);
            creaPaneles(correos[i], i);
    
        }
        estadoEnviados = false;
        estadoRecibidos = true;
    }
    
    
    
}

function cargarRecibidos(){

    let correos = JSON.parse(localStorage.getItem("correosRecibidos"));
    if(estadoRecibidos){
        limpiarContenedor("list-tab");
        limpiarContenedor("nav-tabContent");
        for(var i = 0; i < correos.length; i++){
        
            creaMensajes(correos[i].asunto, i);
            creaPaneles(correos[i], i);
        }
        estadoEnviados = true;
        estadoRecibidos = false;
    }
    
}

function creaMensajes(contenido, cantidad){
    
    var contenedorMensajes = document.getElementById("list-tab");
    
    //MENSAJE
    var a = document.createElement("a");
    a.classList = "list-group-item list-group-item-dark";
    a.id = "mensaje" + (cantidad+1);
    a.setAttribute("data-bs-toggle", "list");
    a.href = "#panel"+(cantidad+1);
    a.role = "tab";
    a.innerHTML = contenido;

    //APPEND AL DIV
    contenedorMensajes.appendChild(a);
}

function limpiarContenedor(contenedorId) {
    var contenedor = document.getElementById(contenedorId);
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
}

function creaPaneles(informacion, cantidad){
    
    var contenedorPaneles = document.getElementById("nav-tabContent");
    

    //PARSEAMIENTO DE INFORMACION
    var jsonFormateado = `
    Remitente: ${informacion.idRemitente}
    Destinatario: ${informacion.idDestinatario}
    Asunto: ${informacion.asunto}
    Mensaje: ${informacion.correo}
    `;

    //TEXTAREA
    var textarea = document.createElement("textarea");
    textarea.id = "textArea" + (cantidad+1);
    textarea.rows = "20";
    textarea.cols = "80";
    textarea.readOnly = true;
    textarea.value = jsonFormateado;
    //PANEL
    var div = document.createElement("div");
    div.classList = "tab-pane fade";
    div.id = "panel"+(cantidad+1);
    div.role = "tabpanel";

    //APPEND
    div.appendChild(textarea);
    contenedorPaneles.appendChild(div);
}