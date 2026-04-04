const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'Diseño/HTML_CSS')));

const db = new sqlite3.Database('./petbridge.db', (err) => {
    if (err) console.error(err.message);
    console.log('✅ Conectado a TU base de datos PetBridge.');
});

// --- LOGIN MULTI-TABLA ---
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Buscamos primero en Adoptantes
    const sqlAdoptante = `SELECT * FROM Adoptantes WHERE email = ? AND password = ?`;
    
    db.get(sqlAdoptante, [email, password], (err, user) => {
        if (user) {
            return res.json({ success: true, usuario: { nombre: user.nombre, tipo: 'adoptante', id: user.id_adoptante } });
        }

        // Si no está en adoptantes, buscamos en Protectoras
        const sqlProtectora = `SELECT * FROM Protectoras WHERE email = ? AND password = ?`;
        db.get(sqlProtectora, [email, password], (err, prot) => {
            if (prot) {
                return res.json({ success: true, usuario: { nombre: prot.nombre_protectora, tipo: 'protectora', id: prot.id_protectora } });
            }
            res.status(401).json({ success: false, mensaje: "Usuario no encontrado" });
        });
    });
});

// --- OBTENER ANIMALES (Para el portal) ---
app.get('/api/animales', (req, res) => {
    db.all("SELECT * FROM Animales", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.listen(3000, () => console.log('🚀 Servidor listo en http://localhost:3000'));



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