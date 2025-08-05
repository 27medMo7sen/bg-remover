import { HttpException, Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './auth.model';
import { Model } from 'mongoose';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('1234567890', 6);
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Auth') private readonly authModel: Model<Auth>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}
  //MARK: signup
  async signup(body: SignupDto) {
    const existingUser = await this.getUserByEmail(body.email);
    if (existingUser) {
      throw new HttpException('User already exists', 409);
    }
    if (body.password !== body.confirmPassword) {
      throw new HttpException('Passwords do not match', 400);
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;
    const newUser = new this.authModel(body);
    await newUser.save();
    const code = nanoid();
    await this.mailService.sendWelcomeEmail(body.email, body.username, code);
    newUser.code = code;
    newUser.save();
    return {
      message: 'User created successfully',
      user: {
        email: newUser.email,
      },
    };
  }
  //MARK: verifyEmail
  async verifyEmail(email: string, code: string) {
    const user = await this.authModel.findOne({ email });
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    if (user.isVerified) {
      throw new HttpException('Email already verified', 400);
    }
    if (code !== user.code) {
      throw new HttpException('Invalid verification code', 400);
    }
    user.isVerified = true;
    await user.save();
    return {
      message: 'Email verified successfully',
    };
  }
  //MARK: login
  async login(body: LoginDto, user: any) {
    if (!user) {
      throw new HttpException('Invalid credentials', 401);
    }
    const token = this.jwtService.sign({ userId: user._id, email: user.email });
    user.token = token;
    const updatedUser = await this.authModel.findByIdAndUpdate(user._id, {
      token,
    });
    // console.log('User:', user);
    return { user: updatedUser };
  }
  //MARK: getUserByEmail
  async getUserByEmail(email: string): Promise<Auth | null> {
    return this.authModel.findOne({ email });
  }
  //MARK: validateUser
  async validateUser(email: string, password: string): Promise<Auth | null> {
    const user = await this.getUserByEmail(email);
    if (!user) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }
    return user;
  }

  //MARK: validateOAuthUser
  async validateOAuthUser(profile: any) {
    const { _json } = profile;
    console.log(_json);
    let user = await this.authModel.findOne({ email: _json.email });
    let token;
    if (!user) {
      const newUser = new this.authModel({
        email: _json.email,
        secureURL: _json.picture,
        username: _json.name,
        isVerified: true,
      });
      token = this.jwtService.sign({
        userId: newUser._id,
        email: newUser.email,
      });
      newUser.token = token;
      await newUser.save();
      return newUser;
    }
    token = this.jwtService.sign({ userId: user._id, email: user.email });
    const userUpdate = await this.authModel.findOneAndUpdate(
      { email: _json.email },
      { token },
      { new: true },
    );
    return userUpdate;
  }
  //MARK: refreshToken
  async refreshToken(token: string) {
    const user = await this.authModel.findOne({ token });
    if (!user) {
      throw new HttpException('Invalid token', 401);
    }
    const newToken = this.jwtService.sign({
      userId: user._id,
      email: user.email,
    });
    user.token = newToken;
    await user.save();
    return {
      message: 'Token refreshed successfully',
      token: newToken,
      user: {
        email: user.email,
        username: user.username,
        secureURL: user.secureURL,
      },
    };
  }

  //MARK: getUserByToken
  async getUserByToken(token: string): Promise<Auth | null> {
    const user = await this.authModel.findOne({ token });
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return user;
  }
}
