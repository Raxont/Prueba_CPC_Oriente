import express from "express"; // Importa Express para crear el servidor
import http from "http"; // Importa el módulo HTTP para crear un servidor
import productsRoutes from "../../routes/productsRoutes.js"; // Rutas de los productos
import corsConfig from "../middlewares/server/corsConfig.cjs"; // Configuración de CORS

import { jsonParseErrorHandler } from "../middlewares/errorHandling.cjs"; // Middleware para manejar errores de JSON
import { limiTotal } from "../middlewares/rateLimit.cjs"; // Middleware para limitar solicitudes

//* Función para crear y configurar el servidor Express
const createServer = () => {
  const app = express(); // Crea una nueva instancia de Express
  
  // Middlewares
  app.use(corsConfig); // Middleware para configurar CORS
  app.use(express.json()); // Middleware para analizar JSON en las solicitudes
  app.use(jsonParseErrorHandler); // Middleware para manejar errores en el análisis de JSON
  app.use(limiTotal); // Middleware para limitar el total de solicitudes
  app.use(express.urlencoded({ extended: true })); // Middleware para analizar datos URL-encoded
  
  // Rutas
  app.use('/api/products', productsRoutes);
  
  //* Crear un servidor HTTP usando la aplicación Express
  const server = http.createServer(app); // Crea un servidor HTTP con la aplicación Express
  return server; // Retorna el servidor configurado
};

export default createServer; // Exporta la función para su uso en otros módulos