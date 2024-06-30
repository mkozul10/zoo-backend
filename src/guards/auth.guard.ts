import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { IS_PUBLIC_KEY } from "src/app.controller";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";

export class AuthGuard implements CanActivate {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private reflector: Reflector,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const accessTokenSecret = this.configService.get<string>('common.access_token_secret');
        const disableRefreshToken = this.configService.get<boolean>('common.disable_refresh_token');
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) return true;

        const request = context.switchToHttp().getRequest();
        const accessToken = this.extractTokenFromHeader(request);
        try {
            const payload = this.jwtService.verify(accessToken, { secret: accessTokenSecret });
            const id = payload['sub'];
            const user = await this.userRepo.findOneOrFail({
                select: ['id', 'username', 'refreshToken'],
                where: { id }
            });

            if (!disableRefreshToken) {
                const refreshToken = request['cookies']['refresh-token'];
                if (refreshToken) {
                    if (user.refreshToken !== refreshToken)
                        throw Error;
                }
                else throw Error;
            } else if (disableRefreshToken && !user.refreshToken) {
                throw Error;
            }

            request['user'] = user;
        } catch (e) {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request) {
        const accessToken: string = request.headers['authorization'];
        if (!accessToken) return '';
        const segments = accessToken.split(' ');
        if(
            segments.length === 2 &&
            segments.includes('Bearer')
        ) return segments[1];
        return '';        
    }
}