import {
  Controller,
  Get,
  Query,
  Body,
  Post,
  Delete,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
  Put,
  ConflictException,
} from '@nestjs/common';
import { ProductInterface } from './interfaces/product.interface';
import { Product } from './schema/product.schema';
import type { ProductUpdateInterface } from './interfaces/productsUpdate.interface';
import type { ProductDeleteInterface } from './interfaces/productsDelete.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Public } from '../common/decorators/skip.auth';
import { CreateProductService } from './services/create-product/create-product.service';
import { UpdateProductService } from './services/update-product/update-product.service';
import { DeleteProductService } from './services/delete-product/delete-product.service';
import { GetProductService } from './services/get-product/get-product.service';
import { GetSortedProductService } from './services/get-sorted-product/get-sorted-product.service';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enum/role.enum';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateProductDto } from './dto/update-product.dto';
import { DeleteOrderDto } from '../order/dto/delete.order.dto';

@Controller('product')
export class ProductController {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly updateProductService: UpdateProductService,
    private readonly deleteProductService: DeleteProductService,
    private readonly getProductService: GetProductService,
    private readonly getSortedProductService: GetSortedProductService,
    private cloudinaryService: CloudinaryService,
  ) {}

  // For Get all product

  @ApiOperation({ summary: 'Get Product List' }) // Operation description
  @ApiResponse({
    status: 200,
    description: 'Product List',
  }) // Document the response
  @Public()
  @Get()
  getProduct(): Promise<Product[]> {
    return this.getProductService.getAllProduct();
  }

  // For getting Categor wise Product

  @ApiOperation({ summary: 'Get Product Based On Category' }) // Operation description
  @ApiResponse({
    status: 200,
    description: 'Product Based on Category',
  }) // Document the response
  @Public()
  @Get(':category')
  async getSelectedProduct(
    @Query('category') category: string,
  ): Promise<string | ProductInterface[]> {
    // console.log('hello');
    return await this.getSortedProductService
      .getCategoryProduct(category)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      .then((data) => data)
      .catch((e) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return `${(e.message as string) ?? 'not found'}`;
      });
  }

  // For Add new Product
  // @Public()

  @ApiOperation({ summary: 'Add Product' }) // Operation description
  @ApiResponse({
    status: 200,
    description: 'Add Product Only For role = "admin" ',
    type: [CreateProductDto],
  }) // Document the response
  @Roles(Role.admin)
  @Post('create')
  @UseInterceptors(FileInterceptor('product_images'))
  async addNewProduct(
    @Body(new ValidationPipe()) product: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Product[]> {
    try {
      const uploadImage = await this.cloudinaryService.uploadImage(file);

      product.product_images = uploadImage?.secure_url
        ? [uploadImage.secure_url]
        : [];

      return await this.createProductService.addProduct(
        product as ProductInterface,
      );
    } catch {
      throw new ConflictException('Product creation failed');
    }
  }

  // For Updating Product
  @ApiOperation({ summary: 'Update Product' }) // Operation description
  @ApiResponse({
    status: 200,
    description: 'Update Product Only For role = "admin" ',
    type: [UpdateProductDto],
  }) // Document the response
  @Roles(Role.admin)
  @Put('update')
  async updateProductContoller(
    @Body() product: ProductUpdateInterface,
  ): Promise<string> {
    return this.updateProductService.updateProduct(product);
  }

  // For delete A  Product

  @ApiOperation({ summary: 'Delete Product' }) // Operation description
  @ApiResponse({
    status: 200,
    description: 'Delete Product Only For role = "admin" ',
    type: [DeleteOrderDto],
  }) // Document the response
  @Roles(Role.admin)
  @Delete('delete')
  async deleteProductController(
    @Query() product: ProductDeleteInterface,
  ): Promise<string> {
    return this.deleteProductService.deleteProduct(product);
  }
}
