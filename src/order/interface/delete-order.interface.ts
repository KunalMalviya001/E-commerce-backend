import { Product } from '../../product/schema/product.schema';

export interface DeleteOrderInterface {
  user_email: string;
  items: Product[];
}
