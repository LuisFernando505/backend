const Calificacion = require('../models/Calificacion');

// Obtener todas las calificaciones
const obtenerCalificaciones = async (req, res) => {
  try {
    const calificaciones = await Calificacion.find()
      .populate('alumnoId')
      .populate('materiaId');
    res.json(calificaciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una calificación por su ID
const obtenerCalificacion = async (req, res) => {
  try {
    const calificacion = await Calificacion.findById(req.params.id)
      .populate('alumnoId')
      .populate('materiaId');
    if (!calificacion) return res.status(404).json({ message: 'Calificación no encontrada' });
    res.json(calificacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva calificación
const crearCalificacion = async (req, res) => {
  const { calificacion, alumnoId, materiaId } = req.body;

  const nuevaCalificacion = new Calificacion({
    calificacion,
    alumnoId,
    materiaId,
  });

  try {
    const calificacionGuardada = await nuevaCalificacion.save();
    res.status(201).json(calificacionGuardada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar una calificación
const actualizarCalificacion = async (req, res) => {
  try {
    const calificacionActualizada = await Calificacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!calificacionActualizada) return res.status(404).json({ message: 'Calificación no encontrada' });
    res.json(calificacionActualizada);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una calificación
const eliminarCalificacion = async (req, res) => {
  try {
    const calificacionEliminada = await Calificacion.findByIdAndDelete(req.params.id);
    if (!calificacionEliminada) return res.status(404).json({ message: 'Calificación no encontrada' });
    res.json({ message: 'Calificación eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  obtenerCalificaciones,
  obtenerCalificacion,
  crearCalificacion,
  actualizarCalificacion,
  eliminarCalificacion,
};