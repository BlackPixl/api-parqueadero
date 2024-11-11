const express = require('express');
const sequelize = require('./config/database');
const parkingRoutes = require('./routes/parkingRoutes');

require('dotenv').config();

const app = express();
app.use(express.json());

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
