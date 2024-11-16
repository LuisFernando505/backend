const Grupo = require('../models/Grupo');

// Obtener todos los grupos
exports.getGrupos = async (req, res) => {
    try {
        const grupos = await Grupo.find();
        res.status(200).json(grupos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un grupo por ID
exports.getGrupoById = async (req, res) => {
    try {
        const grupo = await Grupo.findById(req.params.id);
        if (!grupo) return res.status(404).json({ message: 'Grupo no encontrado' });
        res.status(200).json(grupo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo grupo
exports.createGrupo = async (req, res) => {
    const grupo = new Grupo(req.body);
    try {
        const nuevoGrupo = await grupo.save();
        res.status(201).json(nuevoGrupo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un grupo existente
exports.updateGrupo = async (req, res) => {
    try {
        const grupo = await Grupo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!grupo) return res.status(404).json({ message: 'Grupo no encontrado' });
        res.status(200).json(grupo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un grupo
exports.deleteGrupo = async (req, res) => {
    try {
        const grupo = await Grupo.findByIdAndDelete(req.params.id);
        if (!grupo) return res.status(404).json({ message: 'Grupo no encontrado' });
        res.status(200).json({ message: 'Grupo eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};