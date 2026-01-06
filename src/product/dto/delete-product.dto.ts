import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Enter Product ID Unique',
    example: '1',
  })
  product_id: number;
}
