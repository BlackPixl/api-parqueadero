const express = require('express');
const ParkingController = require('../controllers/parkingController');
const router = express.Router();

/**
 * @swagger
 * /api/parking/entry:
 *   post:
 *     summary: Register vehicle entry
 *     description: Register a new vehicle entering the parking lot
 *     tags: [Parking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plate
 *               - type
 *             properties:
 *               plate:
 *                 type: string
 *                 description: Vehicle plate number
 *                 example: ABC123
 *               type:
 *                 type: string
 *                 enum: [car, motorcycle]
 *                 description: Type of vehicle
 *                 example: car
 *     responses:
 *       200:
 *         description: Vehicle entry registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Vehicle entry registered successfully
 *                 vehicle:
 *                   $ref: '#/components/schemas/Vehicle'
 *       400:
 *         description: Invalid request, Vehicle already parked, Invalid vehicle type or parking space full
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/entry', ParkingController.registerEntry);

/**
 * @swagger
 * /api/parking/exit:
 *   post:
 *     summary: Register vehicle exit
 *     description: Register a vehicle leaving the parking lot and calculate time spent in hpurs, minues and seconds
 *     tags: [Parking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plate
 *             properties:
 *               plate:
 *                 type: string
 *                 description: Vehicle plate number
 *                 example: ABC123
 *     responses:
 *       200:
 *         description: Vehicle exit registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Vehicle exit registered successfully
 *                 timeSpent:
 *                   type: object
 *                   properties:
 *                     hours:
 *                       type: number
 *                       example: 2
 *                     minutes:
 *                       type: number
 *                       example: 3
 *                     seconds:
 *                       type: number
 *                       example: 32
 *                 vehicle:
 *                   $ref: '#/components/schemas/Vehicle'
 *       400:
 *         description: Invalid plate number or vehicle not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/exit', ParkingController.registerExit);

module.exports = router;
