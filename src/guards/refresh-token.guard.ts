import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";

export class RefreshTokenGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private configService: ConfigService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const refreshTokenSecret= this.configService.get<string>('common.refresh_token_secret');
        const request = context.switchToHttp().getRequest();
        const refreshToken = request['cookies']['refresh-token'];
        if (!refreshToken) throw new UnauthorizedException('refresh-token not valid');
        try {
            const payload = this.jwtService.verify(refreshToken, { secret: refreshTokenSecret });
            const id = payload['sub'];
            request['userId'] = id;
            await this.userRepo.findOneOrFail({ where: { id } });
            return true;
        } catch (e) {
            throw new UnauthorizedException('refresh-token not valid');
        }
    }
}