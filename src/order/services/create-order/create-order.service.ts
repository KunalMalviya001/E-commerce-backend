import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderInterface } from '../../interface/create-order.interface';
import { Order } from '../../schema/order.schema';
import { User } from '../../../user/schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CreateOrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  // For Create Order
  async createOrder(orders: CreateOrderInterface): Promise<string> {
    // Find user by email
    const user = await this.userModel.findOne({
      user_email: orders.user_email,
    });

    if (!user) {
      throw new NotFoundException(
        `User with email ${orders.user_email} not found`,
      );
    }
    // Find user by email
    const existingOrder = await this.orderModel.findOne({
      user: user._id,
    });
    if (!existingOrder) {
      // Create order with proper data
      const newOrder = await this.orderModel.insertMany({
        user: user._id,
        items: [orders.items],
      });
      if (!newOrder) {
        throw new BadRequestException('Failed to place order');
      }
      return 'Order placed successfully';
    }
    return 'Order already exist';
  }
}
