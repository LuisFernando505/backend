const Grado = require('../models/Grado');

// Obtener todos los grados
exports.getGrados = async (req, res) => {
    try {
        const grados = await Grado.find();
        res.status(200).json(grados);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un grado por ID
exports.getGradoById = async (req, res) => {
    try {
        const grado = await Grado.findById(req.params.id);
        if (!grado) {
            return res.status(404).json({ message: 'Grado no encontrado' });
        }
        res.status(200).json(grado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo grado
exports.createGrado = async (req, res) => {
    const grado = new Grado(req.body);
    try {
        const nuevoGrado = await grado.save();
        res.status(201).json(nuevoGrado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un grado existente
exports.updateGrado = async (req, res) => {
    try {
        const grado = await Grado.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!grado) {
            return res.status(404).json({ message: 'Grado no encontrado' });
        }
        res.status(200).json(grado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un grado
exports.deleteGrado = async (req, res) => {
    try {
        const grado = await Grado.findByIdAndDelete(req.params.id);
        if (!grado) {
            return res.status(404).json({ message: 'Grado no encontrado' });
        }
        res.status(200).json({ message: 'Grado eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};