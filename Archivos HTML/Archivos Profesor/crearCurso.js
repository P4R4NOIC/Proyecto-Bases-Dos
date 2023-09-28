function cargarPagina(){
    //FUNCION DE AUTENTICACION DE USUARIO
    autenticar()
    document.getElementById("nombreProfesor").textContent = localStorage.getItem("usuario");
    
    //CARGA LA PAGINA CUANDO TODO ESTA LISTO
    document.addEventListener("DOMContentLoaded", cargarPagina);
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
        let estadoCurso = document.getElementById("estadoCurso").value;
        let foto = document.getElementById("myImg").value;
        if (document.getElementById("estadoCurso").selectedIndex == 0) {
            alert('Por favor, seleccione un curso antes de enviar el formulario.');
        }else{
            let datosUsuario = {
                codigo: codigoCurso,
                fechainit: cursoInicio,
                fechafinal: cursoFin,
                descripcion: desCurso,
                estado: estadoCurso,
                foto: foto,
                nombre: nombreCurso
            };
            nombreUsuario = JSON.stringify(localStorage.getItem("usuario")).username
            let cursoParaProfe = {
                codigo_profesor: nombreUsuario,
                codigo_curso: codigoCurso,
                descripcion: desCurso,
                estado: estadoCurso,
                fechafinal: cursoFin,
                fechainit: cursoInicio,
                foto: foto,
                nombre: nombreCurso
            };
            let datosUsuarioJSON = JSON.stringify(datosUsuario);
            let cursoParaProfeJSON = JSON.stringify(cursoParaProfe);
            //subirDatosCurso(datosUsuarioJSON);
            //registrarCursoParaUnProfe(cursoParaProfeJSON);
            alert("Su curso ha sido creado con éxito.");
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
