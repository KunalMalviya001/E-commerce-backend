// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Product } from './schema/product.schema';
// import { ProductInterface } from './interfaces/products.interface';
// import type { ProductUpdateInterface } from './interfaces/productsUpdate.interface';
// import type { ProductDeleteInterface } from './interfaces/productsDelete.interface';

// @Injectable()
// export class ProductService {
//   constructor(
//     @InjectModel(Product.name) private readonly productModel: Model<Product>,
//   ) {}

//   // For Get ALL Product
//   async getAllProduct(): Promise<Product[]> {
//     return this.productModel.find().exec();
//   }

//   // For Get Product Based on Category
//   async getCategoryProduct(category: string): Promise<ProductInterface[]> {
//     const categoryProduct: ProductInterface[] = await this.productModel.find({
//       product_category: new RegExp(`^${category}$`, 'i'),
//     });
//     if (!categoryProduct || categoryProduct.length == 0) {
//       throw new NotFoundException(`Product ${category} not found`);
//     }
//     return categoryProduct;
//   }

//   // For Adding Product
//   async addProduct(
//     product: ProductInterface,
//     product_url: string[],
//   ): Promise<string> {
//     if (
//       (await this.productModel.find({ product_id: product.product_id }))
//         .length > 0
//     ) {
//       return 'Already Exist';
//     }
//     product.product_images = product_url;
//     const ans = await this.productModel.insertMany(product);
//     if (!ans) {
//       return 'not done';
//     }
//     return 'product added';
//   }

//   // For Updating Product
//   async updateProduct(product: ProductUpdateInterface): Promise<string> {
//     if (
//       await this.productModel.findOneAndUpdate(
//         { product_id: product.product_id },
//         { $set: product },
//       )
//     ) {
//       return 'Product Update';
//     }
//     throw new NotFoundException(`Product not found`);
//   }

//   // For Deleting Product
//   async deleteProduct(product: ProductDeleteInterface): Promise<string> {
//     if (await this.productModel.findOneAndDelete(product)) {
//       return 'One Product Dlete';
//     }
//     return 'No Deletion Happen';
//   }
// }
