var personas = [
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


function cargarPagina(){
    
    autenticar()
    document.getElementById("nombreProfesor").textContent = localStorage.getItem("usuario");
    
    cargarPersonas()

    document.addEventListener("DOMContentLoaded", cargarPagina);
}

function cargarPersonas(){
    for (i = 0; i < personas.length; i++) {
        var persona = personas[i].nombre;
        var ele = document.createElement("a")
        ele.classList = "personas list-group-item list-group-item-dark"
        ele.href = "#";
        ele.role = "tab";
        ele.innerHTML = persona;
        ele.onclick = function (){
            location.href = "../Archivos Profesor/perfilUsuarioVistaProfe.html";

        };
        document.querySelector(".listas").appendChild(ele);
    }
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