import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDataSourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middlewares";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const dataBase = new AuthDataSourceImpl();
    const authRepository = new AuthRepositoryImpl(dataBase);
    const controller = new AuthController(authRepository);

    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);
    router.get("/users", AuthMiddleware.validateJwt, controller.getUsers);

    return router;
  }
}
