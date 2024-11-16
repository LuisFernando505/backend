const mongoose = require('mongoose');

const grupoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  gradoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Grado',
    required: true,
  },
  alumnos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alumno',
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Grupo', grupoSchema);