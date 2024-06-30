import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('nastamba', { schema: 'dbo' })
export class Nastamba extends BaseEntity {

    @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    @ApiProperty({
        required: false,
        type: Number,
        example: 1,
    })
    id: number;

    @Column('varchar', {
        name: 'naziv',
        length: 255,
        nullable: true
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @ApiProperty({
        example: 'string',
        maxLength: 255,
        required: false,
    })
    naziv?: string;

    @Column('varchar', {
        name: 'vrsta',
        length: 255
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @ApiProperty({
        example: 'string',
        maxLength: 255,
        required: false,
    })
    vrsta?: string;

    @ApiProperty({ type: Date })
    @CreateDateColumn({ name: 'created_at', default: () => 'getdate()' })
    createdAt: Date;

    @ApiProperty({ type: Date })
    @UpdateDateColumn({ name: 'updated_at', default: () => 'getdate()' })
    updatedAt: Date;

    @ApiProperty({ type: Date })
    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt: Date | null;

    // TODO - add one-to-many relations when related entities are created
}
