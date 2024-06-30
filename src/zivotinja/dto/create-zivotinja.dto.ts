import { OmitType } from "@nestjs/swagger";
import { Zivotinja } from "../entities/zivotinja.entity";
import { IsIn, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateZivotinjaDto extends OmitType(Zivotinja, [
    'id',
    'createdAt',
    'updatedAt',
    'deletedAt',
    'hasId',
    'save',
    'remove',
    'softRemove',
    'recover',
    'reload',
]) {
    @IsIn(['M', 'F'])
    @IsNotEmpty()
    @IsString()
    @MaxLength(1)
    spol: string;
}