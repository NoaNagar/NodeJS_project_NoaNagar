import mongoose from "mongoose";
import { initDB } from "./initDB";
import { Logger } from "../logs/logger";

const connect = async () => {
  try {
    const connectionString = process.env.DB_CONNECTION_STRING;

    if (!connectionString) {
      console.error("DB_CONNECTION_STRING IS NOT DEFINDE");
      return;
    }

    await mongoose.connect(connectionString);

    Logger.success("Data-base Connected");

    await initDB();
  } catch (err) {
    Logger.error("Can't Connect to data-base", err);
  }
};

export { connect };
