/*
    Verificamos si existe una sesión de usuario
*/
function verificarLogin() {
    if (localStorage.getItem("usuario") == null) {
        window.location.href = "index.html";
    }
}

function salir() {
    localStorage.clear();
    window.location.href = "index.html";
}