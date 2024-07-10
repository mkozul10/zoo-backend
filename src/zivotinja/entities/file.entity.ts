import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Zivotinja } from "./zivotinja.entity";

@Entity('zivotinja_file', { schema: 'dbo' })
export class FileEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    @ApiProperty({
        type: Number,
        example: 1,
    })
    id: number;

    @Column('nvarchar', {
        name: 'file_name',
        length: 255,
        nullable: false,
        unique: true
    })
    @ApiProperty({
        type: String,
        example: 'test',
    })
    fileName: string;

    @Column('nvarchar', {
        name: 'file_type',
        length: 255,
        nullable: false
    })
    @ApiProperty({
        type: String,
        example: 'test',
    })
    fileType: string;

    @Column('varbinary', {
        name: 'file_data',
        length: 'max',
        nullable: false,
        transformer: {
            to: (value: Buffer) => value,
            from: (value: Buffer) => value?.toString('base64')
        }
    })
    @ApiProperty({
        type: Buffer,
    })
    fileData: Buffer;

    @Column('int', {
        name: 'zivotinja_id',
        nullable: false
    })
    @ApiProperty({
        type: Number,
        example: 1,
    })
    zivotinjaId: number;

    @CreateDateColumn({ name: 'created_at', default: () => 'getdate()' })
    @ApiProperty({
        type: Date
    })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', default: () => 'getdate()' })
    @ApiProperty({
        type: Date
    })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    @ApiProperty({
        type: Date
    })
    deletedAt: Date | null;

    @ManyToOne(
        () => Zivotinja,
        (zivotinja) => zivotinja.files,
        {
          onDelete: 'NO ACTION',
          onUpdate: 'NO ACTION',
        },
      )
      @JoinColumn([{ name: 'zivotinja_id', referencedColumnName: 'id' }])
      zivotinja: Zivotinja;


}