import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
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
  user_password?: string;
}
