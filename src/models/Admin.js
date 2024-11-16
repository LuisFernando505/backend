const mongoose = require('mongoose');

const administradorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
  },
  telefono: {
    type: String,
    required: false,
  },
  rol: {
    type: String,
    enum: ['admin', 'coordinador', 'supervisor'],
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Administrador', administradorSchema);