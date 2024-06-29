import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('bo_user', { schema: 'dbo' })
export class Status extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  @ApiProperty({
    required: false,
    type: Number,
    example: 1,
  })
  id: number;

  @Column('varchar', {
    name: 'username',
    unique: true,
    length: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    example: 'string',
    minLength: 1,
    maxLength: 255,
    required: true,
  })
  naziv: string;

  @CreateDateColumn({ name: 'created_at', default: () => 'getdate()' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', default: () => 'getdate()' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @OneToMany(
    () => User,
    (user) => user.status
  )
  users: Status[];
}
