import { Types } from 'mongoose';

export interface GetOrderInterface {
  items: [Types.ObjectId];
}
