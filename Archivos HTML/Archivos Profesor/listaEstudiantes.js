const personas = [
    {
        "primerApellido": "Vindas",
        "segundoApellido": "Hernández",
        "nombre": "Roberto",
        "segundoNombre": "Daniel",
        "correo": "rvindas@estudiantec.cr"
    },
    {
        "primerApellido": "Jimenez",
        "segundoApellido": "Ocampo",
        "nombre": "Gabriel",
        "segundoNombre": "De Jesus",
        "correo": "gabriel@estudiantec.cr"
    },
    {
        "primerApellido": "Mora",
        "segundoApellido": "Corrales",
        "nombre": "Dylan",
        "segundoNombre": "Andrey",
        "correo": "dylan@estudiantec.cr"
    },
    {
        "primerApellido": "Gross",
        "segundoApellido": "Hernández",
        "nombre": "Fernando",
        "segundoNombre": "José",
        "correo": "fernando@estudiantec.cr"
    }
]

function cargarPagina(){
    //FUNCION DE AUTENTICACION DE USUARIO
    autenticar()
    document.getElementById("nombreProfesor").textContent = localStorage.getItem("usuario");
    cargarPersonas()
    //CARGA LA PAGINA CUANDO TODO ESTA LISTO
    document.addEventListener("DOMContentLoaded", cargarPagina);
}

function cargarPersonas(){

    for (i = 0; i < personas.length; i++) {
        //CREA UNA FILA
        var fila = document.createElement("tr"); 

        //CREA LA PRIMERA COLUMNA
        var columnaApellido = document.createElement("td"); 
        columnaApellido.innerHTML = personas[i].primerApellido + " " + personas[i].segundoApellido;
        fila.appendChild(columnaApellido);

        //CREA LA SEGUNDA COLUMNA
        var columnaNombre = document.createElement("td"); 
        columnaNombre.innerHTML = personas[i].nombre + " " + personas[i].segundoNombre;
        fila.appendChild(columnaNombre);

        //CREA LA TERCERA COLUMNA
        var columnaCorreo = document.createElement("td"); 
        columnaCorreo.innerHTML = personas[i].correo;
        fila.appendChild(columnaCorreo);

        //AGREGA AL TBODY
        document.querySelector(".cuerpoTabla").appendChild(fila);
    }
    
}