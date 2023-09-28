
function cargarPagina(tipo){
    
    autenticar()
    //let usuarioJSON = localStorage.getItem("usuario");
    //var usuario = JSON.parse(usuarioJSON);
    //var nombre = usuario.nombre;
    //console.log(usuario);
    //console.log(usuario.nombre);
    if(localStorage.getItem("conexion") == "PROFE"){
        //document.getElementById("nombreProfesor").textContent = nombre;
        document.getElementById("nombreProfesor").textContent = localStorage.getItem("usuario");
    }
    if(localStorage.getItem("conexion") == "ESTUD"){
        //document.getElementById("nombreEstudiante").textContent = nombre;
        document.getElementById("nombreEstudiante").textContent = localStorage.getItem("usuario");
    }
    
    cargarPersonas(tipo);

    document.addEventListener("DOMContentLoaded", cargarPagina);
}

function cargarPersonas(tipo){
    if(tipo=="todos"){
        //pedirPersonas();
    }
    if(tipo=="amigos"){
        //pedirAmigos();
    }
    
    //BORRAR
    var personasJSON = [
        {
            "nombre": "Juan Pérez",
            "edad": 30,
            "ciudad": "Ciudad de México"
        },
        {
            "nombre": "María González",
            "edad": 28,
            "ciudad": "Buenos Aires"
        },
        {
            "nombre": "Carlos Rodríguez",
            "edad": 35,
            "ciudad": "Madrid"
        },
        {
            "nombre": "Ana Smith",
            "edad": 26,
            "ciudad": "Nueva York"
        },
        {
            "nombre": "Luisa López",
            "edad": 32,
            "ciudad": "Bogotá"
        }
    ]
    localStorage.setItem("personas", JSON.stringify(personasJSON))
    //BORRAR
    let personas = JSON.parse(localStorage.getItem("personas"));
    for (i = 0; i < personas.length; i++) {
        var persona = personas[i].nombre;
        var ele = document.createElement("a")
        ele.classList = "personas list-group-item list-group-item-dark"
        ele.href = "#";
        ele.role = "tab";
        ele.innerHTML = persona;
        ele.onclick = function (){
            if(localStorage.getItem("conexion") == "PROFE"){
                location.href = "../Archivos Profesor/perfilUsuarioVistaProfe.html";
            }
            if(localStorage.getItem("conexion") == "ESTUD"){
                location.href = "../Archivos Estudiante/perfilUsuarioVistaEstudiante.html";
            }
            

        };
        document.querySelector(".listas").appendChild(ele);
    }
}

function pedirPersonas(){
    var nombreDeUsuario = JSON.parse(localStorage.getItem("usuario")).username;
    let datosRecibidos;
    // Hacer la solicitud GET al servidor
    fetch('http://localhost:3000/Usuario/'+nombreDeUsuario)
    .then(response => {
        if (!response.ok) {
            alert('No se pudo obtener la información del usuario');
        }
        return response.json(); // Parsea la respuesta JSON
    })
    .then(data => {
        // Datos recibidos
        datosRecibidos = data;
        localStorage.setItem("personas", JSON.stringify(datosRecibidos))

    })
    .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
    });
}

function pedirAmigos(){
    var nombreDeUsuario = JSON.parse(localStorage.getItem("usuario")).username;
    let datosRecibidos;
    // Hacer la solicitud GET al servidor
    fetch('http://localhost:3000/Usuario/'+nombreDeUsuario)
    .then(response => {
        if (!response.ok) {
            alert('No se pudo obtener la información del usuario');
        }
        return response.json(); // Parsea la respuesta JSON
    })
    .then(data => {
        // Datos recibidos
        datosRecibidos = data;
        localStorage.setItem("personas", JSON.stringify(datosRecibidos))

    })
    .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
    });
}

function buscarPersona(){
    let input = document.getElementById('searchbar').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('personas');

    for (i =0; i < x.length; i++){
        if (!x[i].innerHTML.toLocaleLowerCase().includes(input)){
            x[i].style.display = "none";
        }
        else{
            x[i].style.display = "list-item";
        }
    }
}