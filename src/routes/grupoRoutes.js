const express = require('express');
const router = express.Router();
const grupoController = require('../controllers/grupoController');

// Obtener todos los grupos
router.get('/', grupoController.obtenerGrupos);

// Obtener un grupo por ID
router.get('/:id', grupoController.obtenerGrupo);

// Crear un nuevo grupo
router.post('/', grupoController.crearGrupo);

// Actualizar un grupo por ID
router.put('/:id', grupoController.actualizarGrupo);

// Eliminar un grupo por ID
router.delete('/:id', grupoController.eliminarGrupo);

module.exports = router;