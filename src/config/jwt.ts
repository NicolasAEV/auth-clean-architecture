import jwt from "jsonwebtoken";
import { resolve } from "path";
import { envs } from "./env";
const secretJwt = envs.JWT_SECRET;
export class JwtAdapter {
  static async generateToken(
    payload: Object,
    duration: string = "2h"
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        secretJwt,
        // "seed",
        { expiresIn: duration },
        (err, token) => {
          if (err) {
            return resolve(null);
          }
          console.log(token);
          resolve(token!);
        }
      );
    });
  }
  static verifyToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(
        token,
        // "seed",
        secretJwt,
        (err, decoded) => {
          if (err) {
            return resolve(null);
          }
          resolve(decoded as T);
        }
      );
    });
  }
}
