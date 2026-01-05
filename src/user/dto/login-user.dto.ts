import { Role } from '../../common/enum/role.enum';

export class LoginUserDto {
  user_name?: string;
  user_email: string;
  user_password: string;
  roles: Role[];
  hidden: boolean;
}
