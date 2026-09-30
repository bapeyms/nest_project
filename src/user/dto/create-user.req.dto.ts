import { IsEmail, MinLength, IsString } from "class-validator";

export class CreateUserReqDto {
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(5, { message: "Short password min 5" })
  password: string;
}
