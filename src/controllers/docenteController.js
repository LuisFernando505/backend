const Docente = require('../models/Docente');

// Obtener todos los docentes
const obtenerDocentes = async (req, res) => {
  try {
    const docentes = await Docente.find();
    res.json(docentes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un docente por su ID
const obtenerDocente = async (req, res) => {
  try {
    const docente = await Docente.findById(req.params.id);
    if (!docente) return res.status(404).json({ message: 'Docente no encontrado' });
    res.json(docente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo docente
const crearDocente = async (req, res) => {
  const { nombre, apellido, especialidad } = req.body;

  const nuevoDocente = new Docente({
    nombre,
    apellido,
    especialidad,
  });

  try {
    const docenteGuardado = await nuevoDocente.save();
    res.status(201).json(docenteGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un docente
const actualizarDocente = async (req, res) => {
  try {
    const docenteActualizado = await Docente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!docenteActualizado) return res.status(404).json({ message: 'Docente no encontrado' });
    res.json(docenteActualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un docente
const eliminarDocente = async (req, res) => {
  try {
    const docenteEliminado = await Docente.findByIdAndDelete(req.params.id);
    if (!docenteEliminado) return res.status(404).json({ message: 'Docente no encontrado' });
    res.json({ message: 'Docente eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  obtenerDocentes,
  obtenerDocente,
  crearDocente,
  actualizarDocente,
  eliminarDocente,
};