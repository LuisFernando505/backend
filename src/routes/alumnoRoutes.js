require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 5001;
const router = express.Router();

app.use(cors());
app.use(express.json());

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

// Ruta para obtener todos los alumnos
router.get('/', (req, res) => {
    connection.query('SELECT * FROM alumnos', (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener los alumnos');
            return;
        }
        res.json(results);
    });
});

// Ruta para obtener un alumno por ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM alumnos WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener el alumno');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Alumno no encontrado');
            return;
        }
        res.json(results[0]);
    });
});

// Ruta para crear un nuevo alumno
router.post('/', (req, res) => {
    const nuevoAlumno = req.body;
    connection.query('INSERT INTO alumnos SET ?', nuevoAlumno, (err, results) => {
        if (err) {
            console.error('Error al crear el alumno:', err);
            res.status(500).send('Error al crear el alumno');
            return;
        }
        res.status(201).json({ id: results.insertId, ...nuevoAlumno });
    });
});

// Ruta para actualizar un alumno existente
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const alumnoActualizado = req.body;
    connection.query('UPDATE alumnos SET ? WHERE id = ?', [alumnoActualizado, id], (err, results) => {
        if (err) {
            res.status(500).send('Error al actualizar el alumno');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Alumno no encontrado');
            return;
        }
        res.json({ id, ...alumnoActualizado });
    });
});

// Ruta para eliminar un alumno
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM alumnos WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar el alumno:', err);
            res.status(500).send('Error al eliminar el alumno');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Alumno no encontrado');
            return;
        }
        res.json({ id });
    });
});

module.exports = router;

app.use('/alumnos', router);

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});