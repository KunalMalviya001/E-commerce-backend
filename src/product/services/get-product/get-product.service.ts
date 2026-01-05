import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../../schema/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class GetProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  // For Get ALL Product
  async getAllProduct(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
}
