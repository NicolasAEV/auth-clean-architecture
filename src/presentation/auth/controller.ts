import { Request, Response } from "express";
import {
  AuthRepository,
  RegisterUser,
  RegisterUserDto,
  LoginUserDto,
} from "../../domain";
import { UserModel } from "../../data/mongodb";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.login(req.body);
    if (error) {
      res.status(400).json({ error });
      //  return
    }
    this.authRepository
      .login(loginUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
    // return;
  };

  registerUser = (req: Request, res: Response) => {
    // return res.json("register");
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error) {
      res.status(400).json({ error });
      //  return
    }
    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
    // this.authRepository
    //   .register(registerUserDto!)
    //   .then(async (user) => {
    //     res.json({
    //       // user,
    //       token: await JwtAdapter.generateToken({ id: user.id }),
    //     });
    //   })
    //   .catch((error) => this.handleError(error, res));
    // res.status(201).json(registerUserDto);
    //  return
  };
  getUsers = async (req: Request, res: Response) => {
    await UserModel.find()
      .then(async (users) => {
        res.json({
          //  users,
          user: await req.body.user,
        });
      })
      .catch((error) => this.handleError(error, res));
  };

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal server error" });
  };
}
