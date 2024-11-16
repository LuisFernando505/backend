require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 5001;
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use('/docentes', router);

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

// Conexión a la base de datos
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos');
});

// Ruta para obtener todos los docentes
router.get('/', (req, res) => {
    connection.query('SELECT * FROM docentes', (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener los docentes');
            return;
        }
        res.json(results);
    });
});

// Ruta para obtener un docente por ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM docentes WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener el docente');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Docente no encontrado');
            return;
        }
        res.json(results[0]);
    });
});

// Ruta para crear un nuevo docente
router.post('/', (req, res) => {
    const nuevoDocente = req.body;
    connection.query('INSERT INTO docentes SET ?', nuevoDocente, (err, results) => {
        if (err) {
            console.error('Error al crear el docente:', err);
            res.status(500).send('Error al crear el docente');
            return;
        }
        res.status(201).json({ id: results.insertId, ...nuevoDocente });
    });
});

// Ruta para actualizar un docente existente
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const docenteActualizado = req.body;
    connection.query('UPDATE docentes SET ? WHERE id = ?', [docenteActualizado, id], (err, results) => {
        if (err) {
            res.status(500).send('Error al actualizar el docente');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Docente no encontrado');
            return;
        }
        res.json({ id, ...docenteActualizado });
    });
});

// Ruta para eliminar un docente
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM docentes WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar el docente:', err);
            res.status(500).send('Error al eliminar el docente');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Docente no encontrado');
            return;
        }
        res.json({ id });
    });
});

module.exports = router;