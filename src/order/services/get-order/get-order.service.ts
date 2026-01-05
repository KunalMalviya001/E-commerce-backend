import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../../schema/order.schema';
import { User } from '../../../user/schema/user.schema';
import { GetOrderInterface } from '../../interface/get-order.interface';

@Injectable()
export class GetOrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async viewOrder(
    user_email: string,
  ): Promise<GetOrderInterface | Error | string> {
    // Find user by email
    const user = await this.userModel.findOne({ user_email: user_email });

    if (!user) {
      throw new NotFoundException(`User with email ${user_email} not found`);
    }
    // Find user by email
    const existingOrder = await this.orderModel.findOne({
      user: user._id,
    });
    if (!existingOrder) {
      return 'No Order';
    }
    const userOrder = await existingOrder.populate('user');
    return {
      items: userOrder.items,
    };
  }
}
