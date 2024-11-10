const express = require('express');
const router = express.Router();
const db = require('../db');

// Cupos disponibles para cada tipo de vehiculo.
const MAX_CAR_SPOTS = 5;
const MAX_MOTORCYCLE_SPOTS = 10;

// Obtener el número de vehículos en el parqueadero
const getVehicleCount = async (type) => {
    const [rows] = await db.query(`SELECT COUNT(*) AS count FROM vehicles WHERE type = ? AND exit_time IS NULL`, [type]);
    return rows[0].count;
};

// Registrar ingreso de un vehículo
router.post('/entry', async (req, res) => {
    const { plate, type } = req.body;

    if (type !== 'car' && type !== 'bike') {
        return res.status(400).json({ error: "Tipo de vehículo inválido. Debe ser 'car' o 'bike'." });
    }

    const currentCount = await getVehicleCount(type);
    const maxSpots = type === 'car' ? MAX_CAR_SPOTS : MAX_MOTORCYCLE_SPOTS;

    if (currentCount >= maxSpots) {
        return res.status(400).json({ error: `No hay cupos disponibles para ${type === 'car' ? 'carros' : 'motos'}.` });
    }

    try {
        await db.query(`INSERT INTO vehicles (plate, type) VALUES (?, ?)`, [plate, type]);
        res.status(201).json({ message: `${type === 'car' ? 'Carro' : 'Moto'} registrado exitosamente.` });
    } catch (error) {
        res.status(500).json({ error: "Error al registrar el vehículo." });
    }
});

// Registrar salida de un vehículo
router.post('/exit', async (req, res) => {
    const { plate } = req.body;

    try {
        const [rows] = await db.query(`SELECT * FROM vehicles WHERE plate = ? AND exit_time IS NULL`, [plate]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Vehículo no encontrado o ya salió del parqueadero." });
        }

        const vehicle = rows[0];
        await db.query(`UPDATE vehicles SET exit_time = CURRENT_TIMESTAMP WHERE id = ?`, [vehicle.id]);

        // Calcular tiempo de parqueo
        const entryTime = new Date(vehicle.entry_time);
        const exitTime = new Date();
        const parkedTime = Math.abs(exitTime - entryTime);
        const minutesParked = Math.floor(parkedTime / (1000 * 60));

        res.json({
            message: "Vehículo registrado con salida.",
            parked_time: `${minutesParked} minutos en el parqueadero.`
        });
    } catch (error) {
        res.status(500).json({ error: "Error al registrar la salida del vehículo." });
    }
});

module.exports = router;
