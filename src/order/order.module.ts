import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './schema/order.schema';
import { UserSchema } from '../user/schema/user.schema';
import { CreateOrderService } from './services/create-order/create-order.service';
import { GetOrderService } from './services/get-order/get-order.service';
import { UpdateOrderService } from './services/update-order/update-order.service';
import { DeleteOrderService } from './services/delete-order/delete-order.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [OrderController],
  providers: [
    CreateOrderService,
    GetOrderService,
    UpdateOrderService,
    DeleteOrderService,
  ],
})
export class OrderModule {}
