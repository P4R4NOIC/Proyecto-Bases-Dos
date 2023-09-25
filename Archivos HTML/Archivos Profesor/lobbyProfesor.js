
function cargarPagina(){
    
    autenticar()
    
    document.getElementById("nombreProfesor").textContent = localStorage.getItem("usuario");

    document.addEventListener("DOMContentLoaded", cargarPagina);
}