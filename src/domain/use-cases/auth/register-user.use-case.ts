import { JwtAdapter } from "../../../config/jwt";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";
interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
type signToken = (payload: Object, duration?: string) => Promise<string | null>;

interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}
export class RegisterUser implements RegisterUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: signToken = JwtAdapter.generateToken
  ) {}

  async execute(registerUserDto: RegisterUserDto): Promise<any> {
    const user = await this.authRepository.register(registerUserDto);
    const token = await this.signToken({ id: user.id });
    if (!token) {
      throw CustomError.internalServer("Error generating token");
    }
    // if (error) {
    //   throw new Error(error);
    // }
    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
