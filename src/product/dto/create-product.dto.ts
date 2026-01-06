import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Enter Product ID Unique',
    example: '1',
  })
  product_id: number;

  @ApiProperty({
    description: 'Enter Product name',
    example: 'car',
  })
  product_name: string;

  @ApiProperty({
    description: 'Enter Product Category',
    example: 'automobile',
  })
  product_category: string;

  @ApiProperty({
    description: 'Enter Product detail',
    example: 'car detail',
  })
  product_detail: string;

  @ApiProperty({
    description: 'Enter Product Price',
    example: '100000',
  })
  product_price: number;

  @ApiProperty({
    description: 'Enter Product Stock',
    example: '10',
  })
  product_stock: number;

  @ApiProperty({
    description: 'Enter Product images',
    example: 'Files',
  })
  product_images?: string[];
}
