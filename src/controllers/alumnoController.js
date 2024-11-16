const Alumno = require('../models/Alumno');

// Obtener todos los alumnos
const obtenerAlumnos = async (req, res) => {
  try {
    const alumnos = await Alumno.find();
    res.json(alumnos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un alumno por su ID
const obtenerAlumno = async (req, res) => {
  try {
    const alumno = await Alumno.findById(req.params.id);
    if (!alumno) return res.status(404).json({ message: 'Alumno no encontrado' });
    res.json(alumno);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo alumno
const crearAlumno = async (req, res) => {
  const { nombre, apellido, tipo } = req.body;

  const nuevoAlumno = new Alumno({
    nombre,
    apellido,
    tipo,
  });

  try {
    const alumnoGuardado = await nuevoAlumno.save();
    res.status(201).json(alumnoGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un alumno
const actualizarAlumno = async (req, res) => {
  try {
    const alumnoActualizado = await Alumno.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!alumnoActualizado) return res.status(404).json({ message: 'Alumno no encontrado' });
    res.json(alumnoActualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un alumno
const eliminarAlumno = async (req, res) => {
  try {
    const alumnoEliminado = await Alumno.findByIdAndDelete(req.params.id);
    if (!alumnoEliminado) return res.status(404).json({ message: 'Alumno no encontrado' });
    res.json({ message: 'Alumno eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  obtenerAlumnos,
  obtenerAlumno,
  crearAlumno,
  actualizarAlumno,
  eliminarAlumno,
};