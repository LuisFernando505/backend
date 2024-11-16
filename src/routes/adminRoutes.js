const express = require('express');
const router = express.Router();
const administradorController = require('../controllers/administradorController');

// Obtener todos los administradores
router.get('/', administradorController.obtenerAdministradores);

// Obtener un administrador por ID
router.get('/:id', administradorController.obtenerAdministrador);

// Crear un nuevo administrador
router.post('/', administradorController.crearAdministrador);

// Actualizar un administrador por ID
router.put('/:id', administradorController.actualizarAdministrador);

// Eliminar un administrador por ID
router.delete('/:id', administradorController.eliminarAdministrador);

module.exports = router;