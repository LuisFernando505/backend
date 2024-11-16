const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/alumnos', require('./routes/alumnoRoutes'));
app.use('/api/docentes', require('./routes/docenteRoutes'));
app.use('/api/materias', require('./routes/materiaRoutes'));
app.use('/api/calificaciones', require('./routes/calificacionRoutes'));
app.use('/api/grados', require('./routes/gradoRoutes'));
app.use('/api/grupos', require('./routes/grupoRoutes'));
app.use('/api/administradores', require('./routes/administradorRoutes'));
app.use('/api/auth', require('./routes/authRoutes')); // Rutas de autenticación

module.exports = app;

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.log('Error de conexión a MongoDB:', error));

module.exports = app;