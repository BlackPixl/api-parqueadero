# API Parqueadero

Este proyecto es una API desarrollada en Node.js y Express.js para gestionar el registro de ingresos y salidas de vehículos de un parqueadero.

## Características

- Al ingreso de cada vehículo se reginstran detalles como placa, tipo de vehículo (car, motorcycle) y hora de ingreso.
- A la salida de cada vehículo se calcula automáticamente el tiempo en el parqueadero.
- En la base de datos se almacena el histórico de todos los vehiculos que han entrado y salido del parqueadero.

## Tecnologías

- Node.js
- Express.js
- MySQL
- Sequelize (conexión con la base de datos y representación de los modelos).
- Swagger (Documentación de la API).
- Winston (Logging).

## Instalación (Linux)

1. Clona este repositorio en tu máquina local:  
```bash
git clone https://github.com/BlackPixl/api-parqueadero.git
cd api-parqueadero
```

2. Instala las dependencias necesarias:  
```bash
npm install
```

3. Configura las variables de entorno:  
Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables:  

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=secret
DB_NAME=parking_db
PORT=3000
```
4. Configura la base de datos:  
Debes configurar una base de datos en MySQL con el nombre "parking_db".  
la aplicación utiliza el usuario "root" y la contraseña "secret". Al mismo tiempo, la aplicación se conecta a la base de datos en localhost:3306.  
De manera alternativa, se puede ejecutar un contenedor de docker con el siguiente comando:  
```bash
docker run -d --name mysql-parking -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=parking_db -p 3306:3306 mysql:5.7
```  

5. Inicia la aplicación:  
```bash
npm run prod
```  

La API estará disponible en `http://localhost:3000`.

## Endpoints

### Registro de Ingreso

- **URL**: `/api/parking/entry`
- **Método**: `POST`
- **Descripción**: Registra el ingreso de un vehículo al parqueadero.
- **Cuerpo de la solicitud**:
```json
{
    "plate": "ABC123",
    "type": "car",
}
```
- **Respuesta**:
```json
{
"message": "Vehicle entry registered successfully",
"vehicle": {
    "id": 0,
    "plate": "string",
    "type": "car",
    "entryTime": "2024-11-11T22:47:04.807Z",
    "exitTime": null,
    "isParked": true
    }
}
```

### Registro de Salida

- **URL**: `/api/parking/exit`
- **Método**: `POST`
- **Descripción**: Registra la salida de un vehículo y calcula el tiempo en el parqueadero.
- **Cuerpo de la solicitud**:
```json
{
    "plate": "ABC123"
}
```
- **Respuesta**:
```json
{
    "message": "Vehicle exit registered successfully",
    "timeSpent": {
        "hours": 0,
        "minutes": 4,
        "seconds": 38
    },
    "vehicle": {
        "id": 1,
        "plate": "ABC123",
        "type": "car",
        "entryTime": "2024-11-11T22:47:39.000Z",
        "exitTime": "2024-11-11T22:52:17.605Z",
        "isParked": false,
    }
}
```
