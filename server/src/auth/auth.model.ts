import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({ timestamps: true })
export class Auth {
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  username: string;
  @Prop({ default: 1 })
  credits: number;
  @Prop()
  secureURL: string;
  @Prop()
  publicId: string;
  @Prop()
  token: string;
  @Prop({ type: String, default: null })
  code: string;
  @Prop({ default: false })
  isVerified: boolean;
}
export const AuthSchema = SchemaFactory.createForClass(Auth);
