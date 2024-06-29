import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService
  ) {}

  async getTokens(userId: number, username: string) {

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: 'access-token-secret',
          expiresIn: '20m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: 'refresh-token-secret',
          expiresIn: '7d',
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken
    }
  }
  async login(loginDto: LoginDto, response: Response) {
    const user = await this.userRepo.findOne({
      where: {
        username: loginDto.username
      }
    });
    if (!user)
      throw new UnauthorizedException(`User with username ${loginDto.username} does not exist`);
    
    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) 
      throw new UnauthorizedException('Wrong password');

    const tokens = await this.getTokens(user.id, user.username);

    await this.userRepo.update(
      { id: user.id },
      { refreshToken: tokens.refreshToken }
    );
    response.cookie('refresh-token', tokens.refreshToken, { httpOnly: true, sameSite: 'none', maxAge: 7 * 24 * 60 * 60 * 1000 })
    response.json({ accessToken: tokens.accessToken });
    response.status(HttpStatus.OK);
    return response;
  }

  async logout(userId: number) {
    await this.userRepo.update(
      { id: userId },
      { refreshToken: null }
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Logout successful'
    };
  }

  async refresh(userId: number, response: Response) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('User does not exist');
    const tokens = await this.getTokens(user.id, user.username);
    await this.userRepo.update(
      { id: user.id },
      { refreshToken: tokens.refreshToken }
    );
    response.cookie('refresh-token', tokens.refreshToken, { httpOnly: true, sameSite: 'none', maxAge: 7 * 24 * 60 * 60 * 1000 })
    response.json({ accessToken: tokens.accessToken });
    response.status(HttpStatus.OK);
    return response;
    
  }
}
