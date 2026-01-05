import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true, unique: true })
  product_id: number;

  @Prop({ required: true })
  product_name: string;

  @Prop({ required: true })
  product_category: string;

  @Prop()
  product_detail: string;

  @Prop({ required: true })
  product_price: number;

  @Prop({ required: true })
  product_stock: number;

  @Prop()
  product_images?: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
