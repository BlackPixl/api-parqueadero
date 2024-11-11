const express = require('express');
const sequelize = require('./config/database');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const parkingRoutes = require('./routes/parkingRoutes');

require('dotenv').config();

const app = express();

app.use(express.json());

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "Parking API Documentation"
}));

app.use('/api/parking', parkingRoutes);

const PORT = process.env.PORT || 3000;

async function startServer(){
  try {
    await sequelize.sync();
    console.log('Database connected successfully');
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    })
  } catch (error){
    console.error('Unable to start server: ', error);
  }
}

startServer();
