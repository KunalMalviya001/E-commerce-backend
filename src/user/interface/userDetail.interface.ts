import { Types } from 'mongoose';

export interface UserDetailInterface {
  user_name?: string;
  user_email: string;
  cart?: Types.ObjectId;
}
