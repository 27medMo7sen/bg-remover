import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from './image.model';
import { CloudinaryProvider } from 'src/providers/cloudinary.provider';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }]),
    CloudinaryModule,
    AuthModule,
  ],
  controllers: [ImageController],
  providers: [ImageService, CloudinaryProvider],
  exports: [ImageService],
})
export class ImageModule {}
