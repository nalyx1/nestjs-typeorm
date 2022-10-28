import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Skill } from './entities/skill.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const skills = await Promise.all(
      createUserDto.skills.map((name) => this.preloadSkillByName(name)),
    );

    const user = this.userRepository.create({
      ...createUserDto,
      skills,
    });

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(`Usuário não encontrado`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const skills =
      updateUserDto.skills &&
      (await Promise.all(
        updateUserDto.skills.map((name) => this.preloadSkillByName(name)),
      ));

    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
      skills,
    });

    if (!user) {
      throw new NotFoundException(`Usuário não encontrado`);
    }

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(`Usuário não encontrado`);
    }

    return this.userRepository.remove(user);
  }

  private async preloadSkillByName(name: string): Promise<Skill> {
    const skill = await this.skillRepository.findOne({ where: { name: name } });

    if (skill) {
      return skill;
    }

    return this.skillRepository.create({ name });
  }
}
