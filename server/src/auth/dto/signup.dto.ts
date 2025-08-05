import { IsEmail, IsString, MinLength } from 'class-validator';
export class SignupDto {
  @IsString()
  @MinLength(3)
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(6)
  confirmPassword: string;

  @IsString()
  @MinLength(3)
  username: string;
}
