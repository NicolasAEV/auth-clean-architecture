import { Server } from "./presentation/server";
import { envs } from './config/env';
import { AppRoutes } from "./presentation/routes";
import { MongoDataBase } from "./data/mongodb";

(() => {
  main();
})();

async function main() {
  console.log("hello world");
  await MongoDataBase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME
  });
  new Server({ port: envs.PORT ,
    routes: AppRoutes.routes
  }).start();
}
