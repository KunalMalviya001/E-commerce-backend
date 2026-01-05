import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../../schema/product.schema';
import { Model } from 'mongoose';
import { ProductUpdateInterface } from '../../interfaces/productsUpdate.interface';

@Injectable()
export class UpdateProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  // For Updating Product
  async updateProduct(product: ProductUpdateInterface): Promise<string> {
    if (
      await this.productModel.findOneAndUpdate(
        { product_id: product.product_id },
        { $set: product },
      )
    ) {
      return 'Product Update';
    }
    throw new NotFoundException(`Product not found`);
  }
}
