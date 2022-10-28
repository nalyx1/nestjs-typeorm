import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Skill } from './entities/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Skill])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
