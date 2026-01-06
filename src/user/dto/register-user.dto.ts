import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../common/enum/role.enum';

export class RegisterUserDto {
  @ApiProperty({
    description: 'Enter User Name Optional',
    example: 'kunal',
  })
  user_name?: string;

  @ApiProperty({
    description: 'Enter User Email Unique',
    example: 'kunal@gmail.com',
  })
  user_email: string;

  @ApiProperty({
    description: 'Enter User Password (8 Character)',
    example: 'kunal@1234',
  })
  user_password: string;

  @ApiProperty({
    description: 'Enter User Roles',
    example: 'user  or  admin',
  })
  roles: Role[];
  hidden?: boolean;
}
