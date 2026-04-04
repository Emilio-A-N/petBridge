
function verificarLogin() {
    const userIn = document.getElementById('usuario').value;
    const passIn = document.getElementById('password').value;

    const encontrado = usuariosRegistrados.find(u => u.user === userIn && u.pass === passIn);

    if (encontrado) {
        localStorage.setItem('usuarioNombre', encontrado.nombre);
        localStorage.setItem('usuarioTipo', encontrado.tipo);
        alert("¡Bienvenido " + encontrado.nombre + "!");
        window.location.href = 'inicio.html';
    } else {
        alert("Usuario o contraseña incorrectos. (Prueba admin / 1234)");
    }
}

function actualizarHeader() {
    const nombre = localStorage.getItem('usuarioNombre');
    const tipo = localStorage.getItem('usuarioTipo');

    const divVisitante = document.getElementById('visitante-links');
    const divLogueado = document.getElementById('usuario-logueado');
    const saludo = document.getElementById('saludo-usuario');
    const btnPanel = document.getElementById('link-mi-panel');

    if (divVisitante && divLogueado) {
        if (nombre) {
            divVisitante.style.display = 'none';
            divLogueado.style.display = 'flex';
            saludo.innerText = "Hola, " + nombre;
            
            btnPanel.href = (tipo === 'protectora') ? 'panelProtectora.html' : 'portalAdoptante.html';
        } else {
            divVisitante.style.display = 'flex';
            divLogueado.style.display = 'none';
        }
    }
}

function cerrarSesion() {
    localStorage.clear();
    window.location.href = 'inicio.html';
}

document.addEventListener('DOMContentLoaded', actualizarHeader);