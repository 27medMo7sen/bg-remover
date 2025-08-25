import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.gaurd';
import { Request } from 'express';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    if (!file) {
      throw new Error('No file uploaded');
    }
    return await this.imageService.handleImageProcessing({
      ...file,
      user: req.user,
    });
  }

  @Post('profile-pic')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  async uploadProfilePic(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    if (!file) {
      throw new Error('No file uploaded');
    }
    return await this.imageService.uploadProfilePic({
      ...file,
      user: req.user,
    });
  }

  @Get('/user-images')
  @UseGuards(AuthGuard)
  async getUserImages(@Req() req: any) {
    return await this.imageService.getUserImages(req.user);
  }
}
