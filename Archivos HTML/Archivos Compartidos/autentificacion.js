function autenticar(){
    // Verificar si el token de autenticación existe en el almacenamiento local
    const autorizado = localStorage.getItem("usuario");

    if (!autorizado) {
        // Redirigir al usuario a la página de inicio de sesión si no está autenticado
        alert("No ha iniciado sesión")
        window.location.href = "../Archivos Compartidos/login.html";
    }
}

function cierreSesion(){
    localStorage.clear()
    window.location.href="../Archivos Compartidos/login.html"
}