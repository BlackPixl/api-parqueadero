const express = require('express');
const ParkingController = require('../controllers/parkingController');
const router = express.Router();

router.post('/entry', ParkingController.registerEntry);
router.post('/exit', ParkingController.registerExit);

module.exports = router;
