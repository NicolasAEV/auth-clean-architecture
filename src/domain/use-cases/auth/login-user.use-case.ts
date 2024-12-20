import { JwtAdapter } from "../../../config/jwt";
import { LoginUserDto } from '../../dtos/auth/login-user.dto';
import { AuthRepository } from "../../repositories/auth.repository";

interface LoginUserAccessToken {
  token: string;
  user: {
    email: string;
  };
}
type signToken = (payload: Object, duration?: string) => Promise<string | null>;

interface LoginUserUseCase {
  execute(loginUserDto: LoginUserDto): Promise<LoginUserAccessToken>;
}
export class LoginUser implements LoginUserUseCase{
    constructor (
        private readonly authRepository: AuthRepository,
        private readonly signToken: signToken = JwtAdapter.generateToken
    ) {}
    async execute(loginUserDto:LoginUserDto): Promise<any> {
        const user = await this.authRepository.login(loginUserDto);
        console.log(user.email)
        const token = await this.signToken({ email: user.email });
        return {
            token: token!,
            user: {
                email: user.email
            }
        }
    }
}
