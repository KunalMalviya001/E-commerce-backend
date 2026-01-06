import { ApiProperty } from '@nestjs/swagger';

export class RefreshUserDto {
  @ApiProperty({
    description: 'Enter Refresh Token',
    example: 'Given Refresh Token',
  })
  refresh_token: string;
}
