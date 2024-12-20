import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import {
  AuthDataSource,
  CustomError,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { UserMapper } from "../mappers/user.mapper";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";

type HasPassword = (password: string) => string;
type CompareFunction = (password: string, hash: string) => boolean;

export class AuthDataSourceImpl implements AuthDataSource {
  constructor(
    private readonly hasPassword: HasPassword = BcryptAdapter.hash,
    private readonly compareFunction: CompareFunction = BcryptAdapter.compare
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    try {
      const user = await UserModel.findOne({
        email,
      });

      if (!user) {
        throw CustomError.badRequest(" credentials not found");
      }

      const isValidPassword = await this.compareFunction(
        password,
        user.password
      );

      if (!isValidPassword) {
        throw CustomError.badRequest(" credentials not found");
      }

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {
      const existsEmail = await UserModel.findOne({
        email,
      });

      if (existsEmail) {
        throw CustomError.badRequest(" credentials already exists");
      }
      //hash password
      const user = await UserModel.create({
        name,
        email,
        password: this.hasPassword(password),
      });
      //save in data base
      await user.save();

      return UserMapper.userEntityFromObject(user);

      // return new UserEntity("", name, email, password, []);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
