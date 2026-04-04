
// 2. FUNCIÓN PARA EL LOGIN (Ejecutar al pulsar "Entrar")
function verificarLogin() {
    const userIn = document.getElementById('usuario').value;
    const passIn = document.getElementById('password').value;

    const encontrado = usuariosRegistrados.find(u => u.user === userIn && u.pass === passIn);

    if (encontrado) {
        // Guardamos en la "mochila" del navegador
        localStorage.setItem('usuarioNombre', encontrado.nombre);
        localStorage.setItem('usuarioTipo', encontrado.tipo);
        alert("¡Bienvenido " + encontrado.nombre + "!");
        window.location.href = 'inicio.html';
    } else {
        alert("Usuario o contraseña incorrectos. (Prueba admin / 1234)");
    }
}

// 3. FUNCIÓN PARA CONTROLAR EL HEADER (Se ejecuta siempre al cargar)
function actualizarHeader() {
    const nombre = localStorage.getItem('usuarioNombre');
    const tipo = localStorage.getItem('usuarioTipo');

    const divVisitante = document.getElementById('visitante-links');
    const divLogueado = document.getElementById('usuario-logueado');
    const saludo = document.getElementById('saludo-usuario');
    const btnPanel = document.getElementById('link-mi-panel');

    // Verificamos que los elementos existan en el HTML actual para no dar error
    if (divVisitante && divLogueado) {
        if (nombre) {
            divVisitante.style.display = 'none';
            divLogueado.style.display = 'flex';
            saludo.innerText = "Hola, " + nombre;
            
            // Ajustamos el enlace del panel según quién sea
            btnPanel.href = (tipo === 'protectora') ? 'panelProtectora.html' : 'portalAdoptante.html';
        } else {
            divVisitante.style.display = 'flex';
            divLogueado.style.display = 'none';
        }
    }
}

// 4. FUNCIÓN PARA CERRAR SESIÓN
function cerrarSesion() {
    localStorage.clear();
    window.location.href = 'inicio.html';
}

// LANZAR LA COMPROBACIÓN SIEMPRE
document.addEventListener('DOMContentLoaded', actualizarHeader);