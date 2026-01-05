import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../../schema/order.schema';
import { CreateOrderInterface } from '../../interface/create-order.interface';
import { User } from '../../../user/schema/user.schema';
import { GetOrderInterface } from '../../interface/get-order.interface';

@Injectable()
export class DeleteOrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
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
