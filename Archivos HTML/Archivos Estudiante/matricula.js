
function cargarPagina(){
        //FUNCION DE AUTENTICACION DE USUARIO
    autenticar()
    let usuarioJSON = localStorage.getItem("usuario");
    var usuario = JSON.parse(usuarioJSON);
    var nombre = usuario.nombre;
    document.getElementById("nombreEstudiante").textContent = nombre;
    llamarCursos()
    

    
    //CARGA LA PAGINA CUANDO TODO ESTA LISTO
    document.addEventListener("DOMContentLoaded", cargarPagina);
}

function llamarCursos(){
    let usuarioJSON = localStorage.getItem("usuario");
    var usuario = JSON.parse(usuarioJSON);
    var nombreDeUsuario = usuario.username;
    
    let datosRecibidos;
    // Hacer la solicitud GET al servidor
    fetch('http://localhost:3000/consultarMatricula/'+nombreDeUsuario)
    .then(response => {
        if (!response.ok) {
            alert('No se pudo obtener la informaci贸n del usuario');
        }
        return response.json(); // Parsea la respuesta JSON
    })
    .then(data => {
        // Datos recibidos
        datosRecibidos = data;
        
        localStorage.setItem("cursosMatriculables", JSON.stringify(datosRecibidos))
        cargarCursos()

    })
    .catch(error => {
        console.error('Error al obtener la informaci贸n del usuario:', error);
    });
    
}

function cargarCursos(){
    let matricula = JSON.parse(localStorage.getItem("cursosMatriculables"));
        
    for(var i = 0; i < matricula.length; i++){
        var tr = document.createElement("tr");
        var th = document.createElement("th");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
        var a1 = document.createElement("a");
        var a2 = document.createElement("a");

        th.scope = "row";

        a1.classList = "cursosH cursos";
        a1.style = "text-decoration: none; color: white; margin-left: 10px;";
        a1.textContent = matricula[i]["nombre"];
        

        th.appendChild(a1);
        td1.textContent = matricula[i]["profesor"];
        td2.textContent = matricula[i]["codigo"];
        td3.textContent = matricula[i]["descripcion"];
        

        a2.classList = "boton botonProfe btnMatricula";
        a2.type = "button";
        a2.role = "button";
        a2.id = "boton"+(i+1);
        a2.textContent = "Matricular"
        var codigoF =matricula[i]["codigo"];
        a2.onclick = function(){
            botonMatricula(codigoF)
        }

        td4.appendChild(a2)

        tr.appendChild(th)
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)

        document.querySelector(".cuerpoTabla").appendChild(tr);


    }
}


function botonMatricula(idCurso){
    let usuarioJSON = localStorage.getItem("usuario");
    var usuario = JSON.parse(usuarioJSON);
    
    let datosRecibidos;
    // Hacer la solicitud GET al servidor
    fetch('http://localhost:3000/recuperarCurso/'+idCurso)
    .then(response => {
        if (!response.ok) {
            alert('No se pudo obtener la informaci贸n del usuario');
        }
        return response.json(); // Parsea la respuesta JSON
    })
    .then(data => {
        // Datos recibidos
        datosRecibidos = data;
        localStorage.setItem("cursoAMatricular", JSON.stringify(datosRecibidos))
        let cursoAMatricular = JSON.parse(localStorage.getItem("cursoAMatricular"))
        let datosUsuarioJSON = {
            username: usuario.username,
            codigo: cursoAMatricular.codigo,
            descripcion: cursoAMatricular.descripcion,
            estado: cursoAMatricular.estado,
            fechafinal: cursoAMatricular.fechafinal,
            fechainit: cursoAMatricular.fechainit,
            foto: cursoAMatricular.foto,
            nombre: cursoAMatricular.nombre
        };

        fetch('http://localhost:3000/RegistrarCursoEstudiante', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosUsuarioJSON)
        });

    })
    .catch(error => {
        console.error('Error al obtener la informaci贸n del usuario:', error);
    });

    
}
