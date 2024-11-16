const express = require('express');
const router = express.Router();
const calificacionController = require('../controllers/calificacionController');

// Obtener todas las calificaciones
router.get('/', calificacionController.obtenerCalificaciones);

// Obtener una calificación por ID
router.get('/:id', calificacionController.obtenerCalificacion);

// Crear una nueva calificación
router.post('/', calificacionController.crearCalificacion);

// Actualizar una calificación por ID
router.put('/:id', calificacionController.actualizarCalificacion);

// Eliminar una calificación por ID
router.delete('/:id', calificacionController.eliminarCalificacion);

module.exports = router;