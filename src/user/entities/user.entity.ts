import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Status } from "src/status/entities/status.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('bo_user', { schema: 'dbo' })
export class User extends BaseEntity {
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
  username: string;

  @Column('varchar', {
    name: 'password',
    length: 255
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
  password: string;

  @Column('varchar', {
    name: 'refresh_token',
    length: 255,
    select: false,
    nullable: true
  })
  refreshToken: string;

  @Column('tinyint', {
    name: 'status_id',
    unsigned: true,
    select: false,
  })
  @ApiProperty({
    required: true,
    type: Number,
    example: 1,
  })
  statusId: number;

  @CreateDateColumn({ name: 'created_at', default: () => 'getdate()' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', default: () => 'getdate()' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => Status, (status) => status.users, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'status_id', referencedColumnName: 'id' }])
  @ApiProperty({ type: () => Status })
  status: Status;

}
