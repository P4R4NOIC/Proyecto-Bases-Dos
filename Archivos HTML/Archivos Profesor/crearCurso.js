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
        //CREAR DATOS EN BASE
        
    })
});