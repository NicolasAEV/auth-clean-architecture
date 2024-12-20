import mongoose, { mongo } from "mongoose";
interface Options {
  mongoUrl: string;
  dbName: string;
}
export class MongoDataBase {
  static async connect(options: Options) {
    const { mongoUrl, dbName } = options;
    try {
      mongoose.connect(mongoUrl, {
        dbName: dbName,
      });
      console.log("Moingo connected");
    } catch (error) {
      console.log("Moingo connection error", error);
      throw new Error("Mongo connection error");
    }
  }
}
