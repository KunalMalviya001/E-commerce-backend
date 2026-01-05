import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchema } from './schema/user.schema';
import { LoginService } from './services/login/login.service';
import { RegisterService } from './services/register/register.service';
import { UpdateService } from './services/update/update.service';
import { DeleteService } from './services/delete/delete.service';
import { GetUserDetailService } from './services/get-user-detail/get-user-detail.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../common/guards/roles.guard';
import { NestModule } from '@nestjs/common';
import { AuthMiddleware } from '../common/middleware/auth.middleware';
import { AuthService } from './services/refresh-token/auth.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [
    UserService,
    LoginService,
    RegisterService,
    UpdateService,
    DeleteService,
    GetUserDetailService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.GET });
  }
}
