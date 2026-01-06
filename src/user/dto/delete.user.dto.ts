import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserDto {
  @ApiProperty({
    description: 'Enter User Email Unique',
    example: 'kunal@gmail.com',
  })
  user_email: string;
}
