import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";
import { Nastamba } from "src/nastamba/entities/nastamba.entity";
import { Zivotinja } from "src/zivotinja/entities/zivotinja.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('zivotinja_nastamba', { schema: 'dbo' })
export class NastambaZivotinja extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    @ApiProperty({
        required: false,
        type: Number,
        example: 1,
    })
    id: number;
    
    @Column('int', {
        name: 'kolicina',
        nullable: true
    })
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @ApiProperty({
        required: false,
        type: Number,
        example: 1,
    })
    kolicina?: number | null;

    @Column('int', {
        name: 'nastamba_id',
        nullable: true
    })
    @IsInt()
    @Type(() => Number)
    @ApiProperty({
        required: true,
        type: Number,
        example: 1,
    })
    nastambaId: number;

    @Column('int', {
        name: 'zivotinja_id',
        nullable: true
    })
    @IsInt()
    @Type(() => Number)
    @ApiProperty({
        required: true,
        type: Number,
        example: 1,
    })
    zivotinjaId: number;

    @ApiProperty({ type: Date })
    @CreateDateColumn({ name: 'created_at', default: () => 'getdate()' })
    createdAt: Date;

    @ApiProperty({ type: Date })
    @UpdateDateColumn({ name: 'updated_at', default: () => 'getdate()' })
    updatedAt: Date;

    @ApiProperty({ type: Date })
    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt: Date | null;

    @ManyToOne(() => Zivotinja, (zivotinja) => zivotinja.nastambeZivotinje, {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'zivotinja_id', referencedColumnName: 'id' }])
    @ApiProperty({ type: () => Zivotinja })
    zivotinja: Zivotinja;

    @ManyToOne(() => Nastamba, (nastamba) => nastamba.nastambeZivotinje, {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'nastamba_id', referencedColumnName: 'id' }])
    @ApiProperty({ type: () => Nastamba })
    nastamba: Nastamba;
}
