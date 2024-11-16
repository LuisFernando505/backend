require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5001;
const alumnosRoutes = require('./src/routes/alumnoRoutes'); // Importa las rutas de alumnos
const docentesRoutes = require('./src/routes/docenteRoutes'); // Importa las rutas de docentes

app.use(cors());
app.use(express.json());
app.use('/alumnos', alumnosRoutes); // Usa las rutas de alumnos
app.use('/docentes', docentesRoutes); // Usa las rutas de docentes

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});