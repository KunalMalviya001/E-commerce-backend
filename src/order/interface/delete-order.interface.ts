import { Product } from '../../product/schema/product.schema';
import { User } from '../../user/schema/user.schema';

export interface DeleteOrderInterface {
  user: User;
  items: Product[];
}
