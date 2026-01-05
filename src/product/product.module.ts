import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schema/product.schema';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { UpdateProductService } from './services/update-product/update-product.service';
import { DeleteProductService } from './services/delete-product/delete-product.service';
import { GetProductService } from './services/get-product/get-product.service';
import { GetSortedProductService } from './services/get-sorted-product/get-sorted-product.service';
import { CreateProductService } from './services/create-product/create-product.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../common/guards/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    CloudinaryModule,
  ],
  controllers: [ProductController],
  providers: [
    CreateProductService,
    UpdateProductService,
    DeleteProductService,
    GetProductService,
    GetSortedProductService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class ProductModule {}
