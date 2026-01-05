import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../../schema/order.schema';
import { User } from '../../../user/schema/user.schema';
import { CreateOrderInterface } from '../../interface/create-order.interface';

@Injectable()
export class UpdateOrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
  // For Update Order
  async updateOrder(
    user_email: string,
    order: CreateOrderInterface,
  ): Promise<string> {
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
      // Create order with proper data
      const newOrder = await this.orderModel.insertMany({
        user: user._id,
        items: [order],
      });
      if (!newOrder) {
        throw new BadRequestException('Failed to place order');
      }
      return 'Order placed successfully';
    }

    const newOrder = await this.orderModel.findOneAndUpdate(
      { user: user._id },
      { $push: { items: order } },
    );
    if (!newOrder) {
      throw new BadRequestException('Failed to place order');
    }
    return 'Order Added';
  }
}
