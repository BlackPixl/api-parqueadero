// server.js
const express = require('express');
const parkingRoutes = require('./routes/parking');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/parking', parkingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
