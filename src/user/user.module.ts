import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from 'src/status/entities/status.entity';
import { User } from './entities/user.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Status]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
