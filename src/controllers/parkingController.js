const Vehicle = require('../models/vehicle');

class ParkingController {

  /**
   * Checks availability of spaces in the parking lot.
   *
   * @param {string} type - type of vehicle.
   * @returns {boolean} True if theres space available, False if theres no space.
   */
  static async checkAvailability(type) {
    const parkedVehicles = await Vehicle.count({
      where: {
        type,
        isParked: true
      }
    });
    const maxSpaces = type === 'car' ? 5 : 10;
    return parkedVehicles < maxSpaces;
  }

  /**
   * Registers the entry of a new vehicle.
   *
   * @param {object} req - http request.
   * @param {object} res - http response.
   * @returns {object} http response with the success or error code.
   */
  static async registerEntry(req, res) {
  // Esta función registra la entrada de un vehículo.
    try {
      const { plate, type } = req.body;

      if (!plate || !type) {
        return res.status(400).json({ error: 'Plate and type are required' });
      }

      // Verifica si el tipo de vehiculo es válido.
      if (!['car', 'motorcycle'].includes(type)) {
        return res.status(400).json({ error: 'Invalid vehicle type' });
      }

      // Verifica si hay espacio disponible.
      const hasSpace = await ParkingController.checkAvailability(type);
      if (!hasSpace) {
        return res.status(400).json({ error: `No available space for ${type}s` });
      }

      // Verifica si el vehículo ya ha sido parqueado.
      const existingVehicle = await Vehicle.findOne({ where: { plate } });
      if (existingVehicle && existingVehicle.isParked) {
        return res.status(400).json({ error: 'Vehicle is already parked' });
      }

      // Registra la entrada del vehículo.
      const vehicle = existingVehicle || await Vehicle.create({ plate, type });
      await vehicle.update({
        entryTime: new Date(),
        exitTime: null,
        isParked: true
      });

      return res.status(200).json({
        message: 'Vehicle entry registered successfully',
        vehicle
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * Registers the exit of a vehicle from the parking.
   *
   * @param {object} req - http request.
   * @param {object} res - http response.
   * @returns {object} http response with the success or error code.
   */
  static async registerExit(req, res) {
    try {
      const { plate } = req.body;

      if (!plate) {
        return res.status(400).json({ error: 'Plate is required' });
      }

      // Encuentra el vehiculo parqueado.
      const vehicle = await Vehicle.findOne({
        where: {
          plate,
          isParked: true
        }
      });

      if (!vehicle) {
        return res.status(400).json({ error: 'Vehicle not found or not parked' });
      }

      // Calcula el tiempo en parqueadero.
      const exitTime = new Date();
      const timeSpent = exitTime - vehicle.entryTime;
      const hoursSpent = Math.floor(timeSpent / (1000 * 60 * 60));
      const minutesSpent = Math.floor((timeSpent % (1000 * 60 * 60)) / (1000 * 60));
      const secondsSpent = Math.floor((timeSpent % (1000 * 60)) / 1000);

      // Actualiza el tiempo
      await vehicle.update({
        exitTime,
        isParked: false
      });

      return res.status(200).json({
        message: 'Vehicle exit registered successfully',
        timeSpent: {
          hours: hoursSpent,
          minutes: minutesSpent,
          seconds: secondsSpent
        },
        vehicle
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ParkingController;
