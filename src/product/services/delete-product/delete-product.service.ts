import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../../schema/product.schema';
import { ProductDeleteInterface } from '../../interfaces/productsDelete.interface';
import { Model } from 'mongoose';

@Injectable()
export class DeleteProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  // For Deleting Product
  async deleteProduct(product: ProductDeleteInterface): Promise<string> {
    if (await this.productModel.findOneAndDelete(product)) {
      return 'One Product Dlete';
    }
    return 'No Deletion Happen';
  }
}
