const Admin = require('../models/Admin');

// Obtener todos los administradores
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json({
            status: 'success',
            results: admins.length,
            data: {
                admins
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Crear un nuevo administrador
exports.createAdmin = async (req, res) => {
    try {
        const newAdmin = await Admin.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                admin: newAdmin
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Obtener un administrador por ID
exports.getAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({
                status: 'fail',
                message: 'No admin found with that ID'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                admin
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Actualizar un administrador
exports.updateAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!admin) {
            return res.status(404).json({
                status: 'fail',
                message: 'No admin found with that ID'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                admin
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Eliminar un administrador
exports.deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id);
        if (!admin) {
            return res.status(404).json({
                status: 'fail',
                message: 'No admin found with that ID'
            });
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};