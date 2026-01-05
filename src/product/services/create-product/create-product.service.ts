import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../../schema/product.schema';
import { ProductInterface } from '../../interfaces/product.interface';
import { Injectable, ConflictException } from '@nestjs/common';

@Injectable()
export class CreateProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async addProduct(product: ProductInterface): Promise<Product[]> {
    const exists = await this.productModel.exists({
      product_id: product.product_id,
    });

    if (exists) {
      throw new ConflictException('Product already exists');
    }
    const {
      product_id,
      product_name,
      product_category,
      product_detail,
      product_price,
      product_stock,
      product_images,
    } = product;
    return await this.productModel.insertMany({
      product_id: product_id,
      product_name: product_name,
      product_category: product_category,
      product_detail: product_detail,
      product_price: product_price,
      product_stock: product_stock,
      product_images: product_images,
    });
  }
}
