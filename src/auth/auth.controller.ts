import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConflictResponse, ApiCookieAuth, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { ErrorDto } from 'src/dto/error.dto';
import { Public } from 'src/app.controller';
import { RefreshTokenGuard } from 'src/guards/refresh-token.guard';
import { Response, Request } from 'express'

@ApiUnauthorizedResponse({ type: ErrorDto })
@ApiBadRequestResponse({ type: ErrorDto })
@ApiNotFoundResponse({ type: ErrorDto })
@ApiInternalServerErrorResponse({ type: ErrorDto })
@ApiBadRequestResponse({ type: ErrorDto })
@ApiConflictResponse({ type: ErrorDto })
@ApiTags('auth')
@ApiBearerAuth('access-token')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: LoginDto })
  async login(@Res() response: Response, @Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto, response);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request) {
    return await this.authService.logout(parseInt(req['user'].id));
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth('refresh-token')
  async refreshToken(@Req() req: Request, @Res() response: Response) {
    return await this.authService.refresh(parseInt(req['userId']), response);
  }
}
