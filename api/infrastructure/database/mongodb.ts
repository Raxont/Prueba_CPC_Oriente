import mongoose from "mongoose";
process.loadEnvFile();

type DbOptions = {
  user?: string;
  pwd?: string;
  dbName?: string;
};

class ConnectToDatabase {
  private static instanceConnect: ConnectToDatabase | null = null;
  private connection?: typeof mongoose;
  private user!: string;
  private dbName!: string;
  private password!: string;

  private constructor({ user, pwd, dbName }: DbOptions = {
    user: process.env.VITE_MONGO_USER,
    pwd: process.env.VITE_MONGO_PWD,
    dbName: process.env.VITE_MONGO_DB_NAME,
  }) {
    if (ConnectToDatabase.instanceConnect) {
      return ConnectToDatabase.instanceConnect;
    }

    this.user = user ?? "";
    this.password = pwd ?? "";
    this.dbName = dbName ?? "";

    ConnectToDatabase.instanceConnect = this;
  }

  static getInstance(options?: DbOptions): ConnectToDatabase {
    if (!ConnectToDatabase.instanceConnect) {
      ConnectToDatabase.instanceConnect = new ConnectToDatabase(options);
    }
    return ConnectToDatabase.instanceConnect;
  }

  async connectOpen(): Promise<void> {
    if (!this.user || !this.password || !this.dbName) {
      throw new Error("❌ Missing database connection credentials");
    }

    const uri = `${process.env.VITE_MONGO_ACCESS}${this.user}:${this.password}@${process.env.VITE_MONGO_HOST}:${process.env.VITE_MONGO_PORT}/${this.dbName}`;
    
    try {
      this.connection = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 30000,
        connectTimeoutMS: 30000,
      });
    } catch (error) {
      throw new Error("Error conectando con la base de datos");
    }
  }

  async connectClose(): Promise<void> {
    if (this.connection) {
      await mongoose.connection.close();
    }
  }
}

export default ConnectToDatabase;
