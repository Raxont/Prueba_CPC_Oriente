import mongoose from "mongoose";
process.loadEnvFile();

/**
 * Tipo de opciones para la configuración de la conexión a la base de datos.
 * @typedef {Object} DbOptions
 * @property {string} [user] - Nombre de usuario para la autenticación en la base de datos.
 * @property {string} [pwd] - Contraseña del usuario para la conexión a la base de datos.
 * @property {string} [dbName] - Nombre de la base de datos a la que se conectará.
 */
type DbOptions = {
  user?: string;
  pwd?: string;
  dbName?: string;
};

/**
 * Clase para manejar la conexión con la base de datos MongoDB utilizando el patrón Singleton.
 */
class ConnectToDatabase {
  private static instanceConnect: ConnectToDatabase | null = null; // Instancia única de la conexión.
  private connection?: typeof mongoose; // Objeto de conexión a la base de datos.
  private user!: string; // Usuario para la conexión.
  private dbName!: string; // Nombre de la base de datos.
  private password!: string; // Contraseña del usuario.

  /**
   * Constructor privado para evitar múltiples instancias de la conexión a la base de datos.
   * @param {DbOptions} options - Opciones de configuración de la conexión a la base de datos.
   */
  private constructor({ user, pwd, dbName }: DbOptions = {
    user: process.env.VITE_MONGO_USER,
    pwd: process.env.VITE_MONGO_PWD,
    dbName: process.env.VITE_MONGO_DB_NAME,
  }) {
    // Si ya existe una instancia, retorna la misma para asegurar el Singleton.
    if (ConnectToDatabase.instanceConnect) {
      return ConnectToDatabase.instanceConnect;
    }

    // Asigna las credenciales de conexión desde las opciones o variables de entorno.
    this.user = user ?? "";
    this.password = pwd ?? "";
    this.dbName = dbName ?? "";

    // Guarda la instancia única en la clase.
    ConnectToDatabase.instanceConnect = this;
  }

  /**
   * Obtiene la instancia única de la conexión a la base de datos.
   * Si no existe, se crea una nueva.
   * @param {DbOptions} [options] - Opciones opcionales para la conexión.
   * @returns {ConnectToDatabase} - Retorna la instancia única de la conexión.
   */
  static getInstance(options?: DbOptions): ConnectToDatabase {
    if (!ConnectToDatabase.instanceConnect) {
      ConnectToDatabase.instanceConnect = new ConnectToDatabase(options);
    }
    return ConnectToDatabase.instanceConnect;
  }

  /**
   * Establece la conexión con la base de datos MongoDB.
   * @returns {Promise<void>} - No retorna ningún valor, pero lanza un error si la conexión falla.
   * @throws {Error} - Lanza un error si faltan credenciales o si ocurre un problema con la conexión.
   */
  async connectOpen(): Promise<void> {
    // Verifica que existan credenciales para la conexión.
    if (!this.user || !this.password || !this.dbName) {
      throw new Error("❌ Missing database connection credentials");
    }

    // Construye la URI de conexión utilizando variables de entorno.
    const uri = `${process.env.VITE_MONGO_ACCESS}${this.user}:${this.password}@${process.env.VITE_MONGO_HOST}:${process.env.VITE_MONGO_PORT}/${this.dbName}`;
    
    try {
      // Intenta conectar con la base de datos utilizando Mongoose.
      this.connection = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 30000, // Tiempo máximo para seleccionar un servidor.
        connectTimeoutMS: 30000, // Tiempo máximo para establecer la conexión.
      });
    } catch (error) {
      throw new Error("Error conectando con la base de datos");
    }
  }

  /**
   * Cierra la conexión con la base de datos si está abierta.
   * @returns {Promise<void>} - No retorna ningún valor.
   */
  async connectClose(): Promise<void> {
    if (this.connection) {
      await mongoose.connection.close();
    }
  }
}

// Exporta la clase ConnectToDatabase para su uso en otras partes de la aplicación.
export default ConnectToDatabase;
