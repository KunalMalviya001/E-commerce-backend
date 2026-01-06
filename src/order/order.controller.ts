import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
// import { Public } from '../common/decorators/skip.auth';
import { GetOrderInterface } from './interface/get-order.interface';
import { CreateOrderService } from './services/create-order/create-order.service';
import { DeleteOrderService } from './services/delete-order/delete-order.service';
import { GetOrderService } from './services/get-order/get-order.service';
import { UpdateOrderService } from './services/update-order/update-order.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteOrderDto } from './dto/delete.order.dto';
import { AddOrderDto } from './dto/add.order.dto';
import { GetOrderDto } from './dto/get.order.dto';

@ApiBearerAuth('access-token')
@ApiTags('Product')
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
  async createOreder(@Body() orders: AddOrderDto): Promise<string | Error> {
    return this.createOrderService.createOrder(orders);
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
  async deleteOreder(@Query() orders: DeleteOrderDto): Promise<string | Error> {
    return this.deleteOrderService.deleteOrder(orders);
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
    @Query() user_email: GetOrderDto,
  ): Promise<GetOrderInterface | Error | string> {
    return this.getOrderService.viewOrder(user_email.user_email);
  }
}
