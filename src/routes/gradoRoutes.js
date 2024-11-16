const express = require('express');
const router = express.Router();
const gradoController = require('../controllers/gradoController');

// Obtener todos los grados
router.get('/', gradoController.obtenerGrados);

// Obtener un grado por ID
router.get('/:id', gradoController.obtenerGrado);

// Crear un nuevo grado
router.post('/', gradoController.crearGrado);

// Actualizar un grado por ID
router.put('/:id', gradoController.actualizarGrado);

// Eliminar un grado por ID
router.delete('/:id', gradoController.eliminarGrado);

module.exports = router;