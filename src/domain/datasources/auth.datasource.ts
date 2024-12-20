import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";
import { LoginUserDto } from '../dtos/auth/login-user.dto';

export abstract class AuthDataSource {
  abstract login(loginUserDto:LoginUserDto): Promise<any>;
  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
