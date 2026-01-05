import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Public } from '../common/decorators/skip.auth';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './user.service';
import { LoginService } from './services/login/login.service';
import { UpdateService } from './services/update/update.service';
import { DeleteService } from './services/delete/delete.service';
import { GetUserDetailService } from './services/get-user-detail/get-user-detail.service';
import { RegisterService } from './services/register/register.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../common/enum/role.enum';
import { Roles } from '../common/decorators/roles.decorator';
import { GetUserInterface } from './interface/getUser.interface';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { AuthService } from './services/refresh-token/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private updteService: UpdateService,
    private deleteService: DeleteService,
    private getUserDetailService: GetUserDetailService,
    private registerService: RegisterService,
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  // For login
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  logIn(@Body() logInDto: LoginUserDto) {
    return this.loginService.loginUser(logInDto);
  }

  // For LogOut
  @Post('logout')
  async logout(@Req() req) {
    await this.userService.updateUser({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      user_email: req.user.sub,
      refresh_token: '',
    });
    return { message: 'Logged out' };
  }

  // for Register
  @Public()
  @Post('registerUser')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.registerService.registerUser(registerUserDto);
  }

  @Put('updateUser')
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    return await this.updteService.updateUser(updateUserDto);
  }

  @Get()
  // @Public()
  @Roles(Role.admin)
  async getUserDetail(
    @Query('user_email') user_email: string,
  ): Promise<GetUserInterface | Error | undefined> {
    return await this.getUserDetailService.getUserDetail(user_email);
  }

  // @Public()
  @Delete('deleteUser')
  async deleteUser(
    @Query('user_email') user_email: string,
  ): Promise<string | Error | undefined> {
    return await this.deleteService.deleteUser(user_email);
  }

  @Public()
  @Post('refresh')
  async refresh(@Body('refresh_token') refresh_token: string) {
    if (!refresh_token) {
      throw new UnauthorizedException();
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const payload = await this.jwtService.verifyAsync(refresh_token, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    const user = await this.userService.findUser(payload.sub);
    if (!user || !user.refresh_token) {
      throw new UnauthorizedException();
    }
    // console.log(refresh_token);

    const isValid = await bcrypt.compare(refresh_token, user.refresh_token);

    if (!isValid) {
      throw new UnauthorizedException();
    }

    const newAccessToken = await this.authService.generateAccessToken({
      sub: user.user_email,
      roles: user.roles,
    });

    const newRefreshToken = await this.authService.generateRefreshToken({
      sub: user.user_email,
      roles: user.roles,
    });

    await this.authService.saveRefreshToken(user.user_email, newRefreshToken);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
