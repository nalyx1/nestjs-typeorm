import {
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Skill } from './skill.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @JoinTable()
  @ManyToMany(() => Skill, (skill) => skill.users, {
    cascade: true,
  })
  skills: Skill[];
}
