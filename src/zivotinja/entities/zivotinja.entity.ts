import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FileEntity } from "./file.entity";

@Entity('zivotinja', { schema: 'dbo' })
export class Zivotinja extends BaseEntity {
    
    @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    @ApiProperty({
        required: false,
        type: Number,
        example: 1,
    })
    id: number;

    @Column('varchar', {
        name: 'latinski_naziv',
        length: 255,
        nullable: false
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @ApiProperty({
        example: 'Panthera tigris',
        maxLength: 255,
        required: true,
    })
    latinskiNaziv: string;

    @Column('varchar', {
        name: 'engleski_naziv',
        length: 255,
        nullable: false
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @ApiProperty({
        example: 'Tiger',
        maxLength: 255,
        required: true,
    })
    engleskiNaziv: string;

    @Column('varchar', {
        name: 'hrvatski_naziv',
        length: 255,
        nullable: false
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @ApiProperty({
        example: 'Tigar',
        maxLength: 255,
        required: true,
    })
    hrvatskiNaziv: string;

    @Column('varchar', {
        name: 'ime',
        length: 255,
        nullable: false
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @ApiProperty({
        example: 'Ime',
        maxLength: 255,
        required: true,
    })
    ime: string;

    @Column('varchar', {
        name: 'spol',
        length: 1,
        nullable: false
    })
    @ApiProperty({
        example: 'F',
        maxLength: 1,
        required: true,
    })
    spol: string;

    @Column('varchar', {
        name: 'opis_dobivanja',
        length: 255,
        nullable: true
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @ApiProperty({
        example: 'LOrem ipsum',
        maxLength: 255,
        required: false,
    })
    opisDobivanja?: string | null;

    @Column('datetime2', {
        name: 'datum_dobivanja',
        nullable: true
    })
    @IsNotEmpty()
    @IsDateString()
    @ApiProperty({
        required: false,
    })
    datumDobivanja?: Date;

    @Column('varchar', {
        name: 'razlog_brisanja',
        length: 255,
        nullable: false
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @ApiProperty({
        maxLength: 255,
        required: false,
    })
    razlogBrisanja?: string | null;

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
        () => FileEntity,
        (fileEntity) => fileEntity.zivotinja,
      )
    @ApiProperty({
        type: () => FileEntity,
        isArray: true
    })
    files: FileEntity[];
      
    // TODO - add one-to-many relations when related entities are created
}
