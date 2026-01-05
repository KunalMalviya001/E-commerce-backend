import { Role } from '../../common/enum/role.enum';

export class RegisterUserDto {
  user_name: string;
  user_email: string;
  user_password: string;
  roles: Role[];
  hidden: boolean;
}
