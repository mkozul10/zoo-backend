import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { NastambaZivotinja } from "src/nastamba-zivotinja/entities/nastamba-zivotinja.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @Column('float', {
        name: 'pol_x',
        nullable: true
    })
    @ApiProperty({
        example: 56.12341,
        required: false,
        nullable: true,
        type: Number
    })
    @IsNumber()
    @Type(() => Number)
    polX?: number | null;

    @Column('float', {
        name: 'pol_y',
        nullable: true
    })
    @ApiProperty({
        example: 56.12341,
        required: false,
        nullable: true,
        type: Number
    })
    @IsNumber()
    @Type(() => Number)
    polY?: number | null;

    @ApiProperty({ type: Date })
    @CreateDateColumn({ name: 'created_at', default: () => 'getdate()' })
    createdAt: Date;

    @ApiProperty({ type: Date })
    @UpdateDateColumn({ name: 'updated_at', default: () => 'getdate()' })
    updatedAt: Date;

    @ApiProperty({ type: Date })
    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt: Date | null;

    @OneToMany(
        () => NastambaZivotinja,
        (nastambaZivotinja) => nastambaZivotinja.nastamba,
      )
    @ApiProperty({
        type: () => NastambaZivotinja,
        isArray: true
    })
    nastambeZivotinje: NastambaZivotinja[];

    // TODO - add one-to-many relations when related entities are created
}
