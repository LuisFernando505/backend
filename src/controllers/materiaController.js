const Materia = require('../models/Materia');

// Obtener todas las materias
const obtenerMaterias = async (req, res) => {
  try {
    const materias = await Materia.find();
    res.json(materias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una materia por su ID
const obtenerMateria = async (req, res) => {
  try {
    const materia = await Materia.findById(req.params.id);
    if (!materia) return res.status(404).json({ message: 'Materia no encontrada' });
    res.json(materia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva materia
const crearMateria = async (req, res) => {
  const { nombre, codigo, creditos } = req.body;

  const nuevaMateria = new Materia({
    nombre,
    codigo,
    creditos,
  });

  try {
    const materiaGuardada = await nuevaMateria.save();
    res.status(201).json(materiaGuardada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar una materia
const actualizarMateria = async (req, res) => {
  try {
    const materiaActualizada = await Materia.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!materiaActualizada) return res.status(404).json({ message: 'Materia no encontrada' });
    res.json(materiaActualizada);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una materia
const eliminarMateria = async (req, res) => {
  try {
    const materiaEliminada = await Materia.findByIdAndDelete(req.params.id);
    if (!materiaEliminada) return res.status(404).json({ message: 'Materia no encontrada' });
    res.json({ message: 'Materia eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  obtenerMaterias,
  obtenerMateria,
  crearMateria,
  actualizarMateria,
  eliminarMateria,
};