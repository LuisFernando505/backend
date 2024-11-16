const mongoose = require('mongoose');

const gradoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  nivel: {
    type: String,
    required: true,
  },
  ciclo: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Grado', gradoSchema);