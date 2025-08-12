import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Image } from './image.model';
import * as fs from 'fs';
import * as path from 'path';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Auth } from 'src/auth/auth.model';
import { spawn } from 'child_process';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel('Image') private readonly imageModel: Model<Image>,
    private readonly cloudinaryService: CloudinaryService,
    @InjectModel('Auth') private readonly authModel: Model<Auth>,
  ) {}

  async handleImageProcessing(file: any) {
    // 1. Check user credits
    const user = await this.authModel.findOne({ _id: file.user.userId });
    if (!user) throw new HttpException('User not found', 404);
    if (user.credits <= 0) throw new HttpException('No enough credits', 300);

    // 2. Create temp folder for output
    const outputDir = path.join(__dirname, 'OutputImages');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 3. Unique filename using userId + timestamp
    const timestamp = Date.now();
    const outputPath = path.join(
      outputDir,
      `${file.user.userId}_${timestamp}.png`,
    );

    // 4. Save uploaded file to disk temporarily
    const inputPath = path.join(
      outputDir,
      `${file.user.userId}_${timestamp}_input.png`,
    );
    fs.writeFileSync(inputPath, file.buffer);

    // 5. Run Python process
    const base64Image: string = await new Promise((resolve, reject) => {
      const pythonProcess = spawn('python3', [
        path.join(__dirname, 'bg_remover.py'),
        inputPath,
        outputPath,
      ]);

      let resultData = '';
      pythonProcess.stdout.on('data', (data) => {
        resultData += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`Python error: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          resolve(resultData.trim());
        } else {
          reject(new Error('Python script failed'));
        }
      });
    });

    // 6. Upload processed image to Cloudinary
    const cloudinaryRet = await this.cloudinaryService.uploadFile({
      fieldname: file.fieldname,
      originalname: file.originalname,
      encoding: file.encoding,
      mimetype: 'image/png',
      size: fs.statSync(outputPath).size,
      buffer: fs.readFileSync(outputPath),
      stream: file.stream,
      destination: file.destination,
      filename: file.filename,
      path: outputPath,
    });

    // 7. Save DB record
    const image = new this.imageModel({
      secureURL: cloudinaryRet.secure_url,
      publicId: cloudinaryRet.public_id,
      user: file.user.userId,
    });
    await image.save();

    // 8. Deduct credits
    await this.authModel.findOneAndUpdate(
      { _id: file.user.userId },
      { $inc: { credits: -1 } },
      { new: true },
    );

    // 9. Cleanup temp files
    try {
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    } catch (err) {
      console.warn(`Cleanup failed: ${err.message}`);
    }

    return image;
  }
}
