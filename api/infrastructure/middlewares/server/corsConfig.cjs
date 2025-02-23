const cors = require("cors"); // Importa el middleware CORS para gestionar las solicitudes de origen cruzado

//* Configuración de CORS (Cross-Origin Resource Sharing)
/**
 * Configuración del middleware CORS para permitir solicitudes desde un origen específico.
 */
const corsConfig = cors({
  origin: process.env.VITE_HTTP_FRONTEND,
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos para las solicitudes
  allowedHeaders: ["Content-Type", "x-version"], // Cabeceras permitidas en las solicitudes
});

module.exports = corsConfig; // Exporta la configuración de CORS para su uso en otros módulos
