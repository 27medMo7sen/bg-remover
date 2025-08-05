import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Image {
  @Prop()
  secureURL: string;
  @Prop()
  publicId: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Auth' })
  user: mongoose.Types.ObjectId;
}
export const ImageSchema = SchemaFactory.createForClass(Image);
