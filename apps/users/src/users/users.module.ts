import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity])],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
