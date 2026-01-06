import { Product } from '../../product/schema/product.schema';

export interface CreateOrderInterface {
  user_email: string;

  items: Product[];
}
