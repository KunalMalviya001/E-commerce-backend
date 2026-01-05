import { Product } from '../../product/schema/product.schema';

export interface CreateOrderInterface {
  items: Product[];
}
