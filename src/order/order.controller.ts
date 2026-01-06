import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import * as createOrderInterface from './interface/create-order.interface';
// import { Public } from '../common/decorators/skip.auth';
import { GetOrderInterface } from './interface/get-order.interface';
import { CreateOrderService } from './services/create-order/create-order.service';
import { DeleteOrderService } from './services/delete-order/delete-order.service';
import { GetOrderService } from './services/get-order/get-order.service';
import { UpdateOrderService } from './services/update-order/update-order.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DeleteOrderDto } from './dto/delete.order.dto';
import { AddOrderDto } from './dto/add.order.dto';
import { GetOrderDto } from './dto/get.order.dto';

@Controller('order')
export class OrderController {
  constructor(
    private createOrderService: CreateOrderService,
    private deleteOrderService: DeleteOrderService,
    private getOrderService: GetOrderService,
    private updateOrderService: UpdateOrderService,
  ) {}

  // @Public()
  @ApiOperation({ summary: 'For Add Order' }) // Operation description
  @ApiResponse({
    status: 200,
    description: 'Add Order',
    type: [AddOrderDto],
  }) // Document the response
  @Post('add')
  async createOreder(
    @Body('user_email') user_email: string,
    @Body('order') order: createOrderInterface.CreateOrderInterface,
  ): Promise<string | Error> {
    return this.createOrderService.createOrder(user_email, order);
  }

  // // @Public()

  // @ApiOperation({ summary: 'For Update Order' }) // Operation description
  // @ApiResponse({
  //   status: 200,
  //   description: 'Add Order',
  //   type: [AddOrderDto],
  // }) // Document the response
  // @Put('update')
  // async updateOreder(
  //   @Body('user_email') user_email: string,
  //   @Body('order') order: createOrderInterface.CreateOrderInterface,
  // ): Promise<string | Error> {
  //   return this.updateOrderService.updateOrder(user_email, order);
  // }

  // @Public()

  // For Delete
  @ApiOperation({ summary: 'For Delete Order' }) // Operation description
  @ApiResponse({
    status: 200,
    description: 'Delete Order',
    type: [DeleteOrderDto],
  }) // Document the response
  @Delete('delete')
  async deleteOreder(
    @Body('user_email') user_email: string,
    @Body('order') order: createOrderInterface.CreateOrderInterface,
  ): Promise<string | Error> {
    return this.deleteOrderService.deleteOrder(user_email, order);
  }

  //   for view Order
  // @Public()
  @ApiOperation({ summary: 'For Get Order List' }) // Operation description
  @ApiResponse({
    status: 200,
    description: 'Order List',
    type: [GetOrderDto],
  }) // Document the response
  @Get('view')
  async getOreder(
    @Body('user_email') user_email: string,
  ): Promise<GetOrderInterface | Error | string> {
    return this.getOrderService.viewOrder(user_email);
  }
}
