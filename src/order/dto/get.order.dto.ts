import { ApiProperty } from '@nestjs/swagger';

export class GetOrderDto {
  @ApiProperty({
    description: 'Enter User Email Unique',
    example: 'kunal@gmail.com',
  })
  user_email: string;
}
