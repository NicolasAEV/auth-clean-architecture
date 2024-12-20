import { Request, Response, NextFunction } from "express";
import { JwtAdapter } from "../../config/jwt";
import { UserModel } from "../../data/mongodb";

export class AuthMiddleware {
  static async validateJwt(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization");
    if (!authorization) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (!authorization.startsWith("Bearer ")) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const token = authorization.split(" ")[1] || "";
    try {
      const payload = await JwtAdapter.verifyToken<{ id: string }>(token);
      if (!payload) {
        res.status(401).json({ error: "invalid token" });
        return;
      }
      const user = await UserModel.findById(payload.id);

      if (!user) {
        res.status(401).json({ error: "invalid token" });
        return;
      }
      req.body.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  }
}
