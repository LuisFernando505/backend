const mongoose = require('mongoose');

const calificacionSchema = new mongoose.Schema({
  calificacion: {
    type: Number,
    required: true,
  },
  alumnoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alumno',
    required: true,
  },
  materiaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Materia',
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Calificacion', calificacionSchema);