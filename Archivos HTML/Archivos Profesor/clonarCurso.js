const cursos = [
    {
        "codigoCurso": "BD-200",
        "nombreCurso": "Bases de Datos",
        "descripcion": "Un curso sobre Bases de Datos.",
        "fechaInicio": "2023-10-01",
        "fechaFin": "2023-12-15",
        "estado": true,
        "direccionFoto": "imagen-curso.jpg"
    },
    {
        "codigoCurso": "BD-201",
        "nombreCurso": "Bases de Datos II",
        "descripcion": "Un curso avanzado sobre Bases de Datos.",
        "fechaInicio": "2023-11-01",
        "fechaFin": "2023-12-31",
        "estado": false,
        "direccionFoto": "imagen-curso-avanzado.jpg"
    }
]


function cargarPagina(){
    //FUNCION DE AUTENTICACION DE USUARIO
    autenticar()
    document.getElementById("nombreProfesor").textContent = localStorage.getItem("usuario");
    
    cargarSeleccionCurso();
    //CARGA LA PAGINA CUANDO TODO ESTA LISTO
    document.addEventListener("DOMContentLoaded", cargarPagina);
}

function cargarSeleccionCurso(){
    let nuevoSelect = document.querySelector(".selectCurso");
    for (var i = 0; i < cursos.length; i++) {
        let opcion = document.createElement("option");
        opcion.text = cursos[i].nombreCurso;
        opcion.value = cursos[i].codigoCurso;
        console.log(opcion)
        nuevoSelect.appendChild(opcion);
    }
    
}

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formulario");

    formulario.addEventListener ("submit", function(event) {
        //EVITA QUE SE ENVIE
        event.preventDefault();
        let codigoParaCopiar = document.getElementById("select").value;
        let codigoCurso = document.getElementById("codigoCurso").value;
        let nombreCurso = document.getElementById("nombreCurso").value;
        let desCurso = document.getElementById("desCurso").value;
        let cursoInicio = document.getElementById("cursoInicio").value;
        let cursoFin = document.getElementById("cursoFin").value;
        let estadoCurso = document.getElementById("estadoCurso").value;
        let foto = document.getElementById("myImg").value;

        if (document.getElementById("select").selectedIndex == 0 || document.getElementById("estadoCurso").selectedIndex == 0) {
            alert('Por favor rellene los selectores faltantes');
        }else{
            let datosUsuario = {
                codigoParaCopiar: codigoParaCopiar,
                codigoCurso: codigoCurso,
                cursoInicio: cursoInicio,
                cursoFin: cursoFin,
                desCurso: desCurso,
                estadoCurso: estadoCurso,
                foto: foto,
                nombreCurso: nombreCurso
            };
            nombreUsuario = JSON.stringify(localStorage.getItem("usuario")).username
            let cursoParaProfe = {
                username: nombreUsuario,
                codigoParaCopiar: codigoParaCopiar,
                codigoCurso: codigoCurso,
                cursoInicio: cursoInicio,
                cursoFin: cursoFin,
                desCurso: desCurso,
                estadoCurso: estadoCurso,
                foto: foto,
                nombreCurso: nombreCurso
            };
            let datosUsuarioJSON = JSON.stringify(datosUsuario);
            let cursoParaProfeJSON = JSON.stringify(cursoParaProfe);
            //subirDatosCurso(datosUsuarioJSON);
            //registrarCursoParaUnProfe(cursoParaProfeJSON);
            alert("Su curso ha sido copiado con éxito.");
            console.log(datosUsuarioJSON);
            console.log(cursoParaProfeJSON);
            //location.href("lobbyProfesor.html");
        }
    })
});

function subirDatosCurso(datos){
    fetch('http://localhost:3000/RegistrarCurso', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: datos
    })
}

function registrarCursoParaUnProfe(datos){
    fetch('http://localhost:3000/RegistrarCursoProfesor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: datos
    })
}