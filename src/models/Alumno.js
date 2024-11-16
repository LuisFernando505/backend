const mongoose = require('mongoose');

const alumnoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    enum: ['regular', 'recursando', 'otro'],
    required: true,
  },
  fechaNacimiento: {
    type: Date,
    required: false,
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
}, {
  timestamps: true,
});

module.exports = mongoose.model('Alumno', alumnoSchema);