import { ApiProperty } from '@nestjs/swagger';

export class RefreshUserDto {
  @ApiProperty({
    description: 'Enter Refresh Token',
    example: '{ "refresh_token": "Given Refresh Token" ',
  })
  refresh_token: string;
}
