import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Order } from './schema/order.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderInterface } from './interface/create-order.interface';
import { User } from '../user/schema/user.schema';
import { GetOrderInterface } from './interface/get-order.interface';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  // For Create Order
  async createOrder(
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
    return 'Order already exist';
  }

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

  async deleteOrder(
    user_email: string,
    order: CreateOrderInterface,
  ): Promise<string | Error> {
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
      return new NotFoundException('User not found');
    }

    const newOrder = await this.orderModel.findOneAndDelete(
      { user: user._id },
      { $pop: { items: order } },
    );
    if (!newOrder) {
      throw new BadRequestException('Failed to delete');
    }
    return 'Order Delete';
  }

  async viewOrder(user_email: string): Promise<GetOrderInterface | Error> {
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
      return new NotFoundException('User not found');
    }
    return existingOrder.populate('user');
  }
}
