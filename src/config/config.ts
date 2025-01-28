import { config } from "dotenv";
config();

const envConfig = {
  port: process.env.PORT,
  mongodbURI: process.env.MONGODB_URI,
  dbName: process.env.MONGO_DB_NAME,
  backendURL: process.env.BACKEND_URL,
  nodeEnv: process.env.NODE_ENV,
};

export default envConfig;
