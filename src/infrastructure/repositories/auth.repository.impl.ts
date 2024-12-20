import {
  AuthDataSource,
  AuthRepository,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly dataSource: AuthDataSource) {}
  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.dataSource.login(loginUserDto);
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.dataSource.register(registerUserDto);
  }
}
