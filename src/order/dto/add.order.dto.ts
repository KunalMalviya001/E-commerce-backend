import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../product/schema/product.schema';

export class AddOrderDto {
  @ApiProperty({
    description: 'Enter User Email Unique',
    example: 'kunal@gmail.com',
  })
  user_email: string;

  @ApiProperty({
    description: 'Enter Product ObjectID',
    example:
      '{ "items": "6956513c3c6841499cc287a7",  "user_email": "tapan@gmail.com" }',
  })
  items: Product[];
}
