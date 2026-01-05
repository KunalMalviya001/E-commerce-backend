import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import * as createOrderInterface from './interface/create-order.interface';
// import { Public } from '../common/decorators/skip.auth';
import { GetOrderInterface } from './interface/get-order.interface';
import { CreateOrderService } from './services/create-order/create-order.service';
import { DeleteOrderService } from './services/delete-order/delete-order.service';
import { GetOrderService } from './services/get-order/get-order.service';
import { UpdateOrderService } from './services/update-order/update-order.service';

@Controller('order')
export class OrderController {
  constructor(
    private createOrderService: CreateOrderService,
    private deleteOrderService: DeleteOrderService,
    private getOrderService: GetOrderService,
    private updateOrderService: UpdateOrderService,
  ) {}

  // @Public()
  @Post('create')
  async createOreder(
    @Body('user_email') user_email: string,
    @Body('order') order: createOrderInterface.CreateOrderInterface,
  ): Promise<string | Error> {
    return this.createOrderService.createOrder(user_email, order);
  }

  // @Public()
  @Put('update')
  async updateOreder(
    @Body('user_email') user_email: string,
    @Body('order') order: createOrderInterface.CreateOrderInterface,
  ): Promise<string | Error> {
    return this.updateOrderService.updateOrder(user_email, order);
  }

  // For Delete
  // @Public()
  @Delete('delete')
  async deleteOreder(
    @Body('user_email') user_email: string,
    @Body('order') order: createOrderInterface.CreateOrderInterface,
  ): Promise<string | Error> {
    return this.deleteOrderService.deleteOrder(user_email, order);
  }

  //   for view Order
  // @Public()
  @Get('view')
  async getOreder(
    @Body('user_email') user_email: string,
  ): Promise<GetOrderInterface | Error | string> {
    return this.getOrderService.viewOrder(user_email);
  }
}
