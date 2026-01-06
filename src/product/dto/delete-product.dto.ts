import { ApiProperty } from '@nestjs/swagger';

export class DeleteProductDto {
  @ApiProperty({
    description: 'Enter Product ID Unique',
    example: '1',
  })
  product_id: number;
}
