const curso = {
    "codigoCurso": "BD-200",
    "nombreCurso": "Bases de Datos",
    "descripcion": "Un curso sobre Bases de Datos.",
    "fechaInicio": "2023-10-01",
    "fechaFin": "2023-12-15",
    "estado": true,
    "direccionFoto": "imagen-curso.jpg"
}


function cargarPagina(){
    //FUNCION DE AUTENTICACION DE USUARIO
    autenticar()
    document.getElementById("nombreProfesor").textContent = localStorage.getItem("usuario");
    
    generarPagina()
    //CARGA LA PAGINA CUANDO TODO ESTA LISTO
    document.addEventListener("DOMContentLoaded", cargarPagina);
}

function generarPagina(){
    document.getElementById("codigoCurso").value = curso.codigoCurso;
    document.getElementById("nombreCurso").value = curso.nombreCurso;
    document.getElementById("desCurso").value = curso.descripcion;
    document.getElementById("cursoInicio").value = curso.fechaInicio;
    document.getElementById("cursoFin").value = curso.fechaFin;
    document.getElementById("estadoCurso").checked = curso.estado;
    
}

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formulario");

    formulario.addEventListener ("submit", function(event) {
        //EVITA QUE SE ENVIE
        event.preventDefault();
        let codigoCurso = document.getElementById("codigoCurso").value;
        let nombreCurso = document.getElementById("nombreCurso").value;
        let desCurso = document.getElementById("desCurso").value;
        let cursoInicio = document.getElementById("cursoInicio").value;
        let cursoFin = document.getElementById("cursoFin").value;
        let estadoCurso = document.getElementById("estadoCurso").checked;
        let foto = document.getElementById("myImg").value
        
        let datosUsuario = {
            codigoCurso: codigoCurso,
            nombreCurso: nombreCurso,
            desCurso: desCurso,
            cursoInicio: cursoInicio,
            cursoFin: cursoFin,
            estadoCurso: estadoCurso,
            foto: foto
        };
        let datosUsuarioJSON = JSON.stringify(datosUsuario);
        alert(datosUsuarioJSON)
        //ACTUALIZAR DATOS EN BASE
        
    })
});