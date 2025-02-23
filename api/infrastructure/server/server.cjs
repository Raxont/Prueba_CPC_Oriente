const express = require("express"); // Importa Express para crear el servidor
const morgan = require("morgan"); // Middleware para el registro de solicitudes HTTP
const http = require("http"); // Importa el módulo HTTP para crear un servidor
// const productsRoutes = require('../../application/routes/productsRoutes.cjs');
const corsConfig = require("../middlewares/server/corsConfig.cjs"); // Configuración de CORS

const { jsonParseErrorHandler } = require("../middlewares/errorHandling.cjs"); // Middleware para manejar errores de JSON
const { limiTotal } = require("../middlewares/rateLimit.cjs"); // Middleware para limitar solicitudes

//* Función para crear y configurar el servidor Express
const createServer = () => {
  const app = express(); // Crea una nueva instancia de Express
  
  // Middlewares
  app.use(corsConfig); // Middleware para configurar CORS
  app.use(express.json()); // Middleware para analizar JSON en las solicitudes
  app.use(morgan("dev")); // Middleware para registrar las solicitudes HTTP en modo desarrollo
  app.use(jsonParseErrorHandler); // Middleware para manejar errores en el análisis de JSON
  app.use(limiTotal); // Middleware para limitar el total de solicitudes
  app.use(express.urlencoded({ extended: true })); // Middleware para analizar datos URL-encoded
  
  // Rutas
  // app.use('/products', productsRoutes);
  
  //* Crear un servidor HTTP usando la aplicación Express
  const server = http.createServer(app); // Crea un servidor HTTP con la aplicación Express
  return server; // Retorna el servidor configurado
};

module.exports = createServer; // Exporta la función para su uso en otros módulos