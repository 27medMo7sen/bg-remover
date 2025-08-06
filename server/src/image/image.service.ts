import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Image } from './image.model';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { AuthService } from 'src/auth/auth.service';
import { Auth } from 'src/auth/auth.model';
const FormData = require('form-data');
@Injectable()
export class ImageService {
  constructor(
    @InjectModel('Image') private readonly imageModel: Model<Image>,
    private readonly cloudinaryService: CloudinaryService,
    @InjectModel('Auth') private readonly authModel: Model<Auth>,
  ) {}

  async handleImageProcessing(file: any) {
    const user = await this.authModel.findOne({ _id: file.user.userId });
    if (user) {
      console.log('here is the user', user);
      if (user.credits <= 0)
        throw new HttpException('there is no enogh credits', 300);
    }
    console.log('this is the file:', file);
    const formData = new FormData();
    formData.append('image_file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });
    try {
      const response = await axios.post(
        'https://clipdrop-api.co/remove-background/v1',
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            'x-api-key': process.env.CLIPDROP_API_KEY,
          },
          responseType: 'arraybuffer',
        },
      );
      const cloudinaryRet = await this.cloudinaryService.uploadFile({
        fieldname: file.fieldname,
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        size: response.data.length,
        buffer: Buffer.from(response.data),
        stream: file.stream,
        destination: file.destination,
        filename: file.filename,
        path: file.path,
      });
      console.log(cloudinaryRet);
      const image = new this.imageModel({
        secureURL: cloudinaryRet.secure_url,
        publicId: cloudinaryRet.public_id,
        user: file.user.userId,
      });
      await image.save();
      const user = await this.authModel.findOneAndUpdate(
        { _id: file.user.userId },
        { $inc: { credits: -1 } },
        { new: true },
      );

      return image;
    } catch (error) {
      console.error(
        'Image processing failed:',
        error.response?.data?.toString('utf-8') || error.message,
      );
      throw new Error('Image processing failed');
    }
  }
}
