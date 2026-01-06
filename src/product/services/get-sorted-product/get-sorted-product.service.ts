import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../../schema/product.schema';
import { Model } from 'mongoose';
import { ProductInterface } from '../../interfaces/product.interface';

@Injectable()
export class GetSortedProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  // For Get Product Based on Category
  async getCategoryProduct(category: string): Promise<ProductInterface[]> {
    const categoryProduct: ProductInterface[] = await this.productModel.find({
      product_category: new RegExp(`^${category}s?$`, 'i'),
    });
    if (!categoryProduct || categoryProduct.length == 0) {
      throw new NotFoundException(`Product ${category} not found`);
    }
    return categoryProduct;
  }
}
