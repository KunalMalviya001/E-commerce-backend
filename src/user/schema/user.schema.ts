import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../../common/enum/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  user_name: string;

  @Prop({ required: true })
  user_email: string;

  @Prop({ required: true })
  user_password: string;

  @Prop()
  hidden: boolean;

  @Prop({ required: true })
  roles: Role[];

  @Prop()
  refresh_token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
