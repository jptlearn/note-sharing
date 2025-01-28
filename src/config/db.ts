import mongoose from "mongoose";
import envConfig from "./config";

const connectToDatabase = async () => {
  try {
    // const connectionInstance = await mongoose.connect(
    //   `${envConfig.mongodbURI}/${envConfig.dbName}`
    // );
    // console.log(connectionInstance);
    // if (connectionInstance.connection.readyState === 1) {
    //   console.log(
    //     `Mongo db connected. DB Host: ${connectionInstance.connection.host}`
    //   );
    // } else {
    //   throw new Error("Database connection not established.");
    // }
    mongoose.connection.on("connected", () => {
      console.log("Connected to db successfully.");
    });
    await mongoose.connect(envConfig.mongodbURI as string);
  } catch (error) {
    console.error("Failed to connect to db!!!");
    process.exit(1);
  }
};

export default connectToDatabase;
