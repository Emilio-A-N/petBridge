const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'Diseño/HTML_CSS')));

const db = new sqlite3.Database('./petbridge.db', (err) => {
    if (err) console.error(err.message);
    console.log('✅ Conectado a TU base de datos PetBridge.');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sqlAdoptante = `SELECT * FROM Adoptantes WHERE email = ? AND password = ?`;
    
    db.get(sqlAdoptante, [email, password], (err, user) => {
        if (user) {
            return res.json({ success: true, usuario: { nombre: user.nombre, tipo: 'adoptante', id: user.id_adoptante } });
        }

        const sqlProtectora = `SELECT * FROM Protectoras WHERE email = ? AND password = ?`;
        db.get(sqlProtectora, [email, password], (err, prot) => {
            if (prot) {
                return res.json({ success: true, usuario: { nombre: prot.nombre_protectora, tipo: 'protectora', id: prot.id_protectora } });
            }
            res.status(401).json({ success: false, mensaje: "Usuario no encontrado" });
        });
    });
});

app.post('/registro', (req, res) => {
    const { tipo, email, password, nombre, apellidos, dni, ciudad, telefono, cif, nombre_protectora } = req.body;

    if (tipo === 'adoptante') {
        const sql = `INSERT INTO Adoptantes (dni, nombre, apellidos, ciudad, email, telefono, password) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        db.run(sql, [dni, nombre, apellidos, ciudad, email, telefono, password], function(err) {
            if (err) return res.status(400).json({ error: "Error en el registro de adoptante" });
            res.json({ success: true });
        });
    } else {
        const sql = `INSERT INTO Protectoras (cif, nombre_protectora, email, password) VALUES (?, ?, ?, ?)`;
        db.run(sql, [cif, nombre_protectora, email, password], function(err) {
            if (err) return res.status(400).json({ error: "Error en el registro de protectora" });
            res.json({ success: true });
        });
    }
});

app.get('/api/animales', (req, res) => {
    db.all("SELECT * FROM Animales", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.listen(PORT, () => console.log(`🚀 Servidor listo en el puerto ${PORT}`));
// Si tus archivos HTML están dentro de la carpeta "Diseño"
app.use(express.static('Diseño')); 
app.use('/Planning', express.static('Planning'));
// Ruta principal: cuando alguien entra a la raíz, le mandamos al inicio
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Diseño/HTML_CSS/inicio.html');
});

// Y asegúrate de tener una ruta para el home si no tienes un index.html en la raíz
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Diseño/login.html'); // O el nombre de tu página principal
});