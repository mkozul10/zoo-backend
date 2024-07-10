import { OmitType } from "@nestjs/swagger";
import { NastambaZivotinja } from "../entities/nastamba-zivotinja.entity";
import { DoesPropertyExist } from "src/validator/validator.service";
import { Nastamba } from "src/nastamba/entities/nastamba.entity";
import { Zivotinja } from "src/zivotinja/entities/zivotinja.entity";
import { IsInt } from "class-validator";
import { Type } from "class-transformer";

export class CreateNastambaZivotinjaDto extends OmitType(NastambaZivotinja,
    [
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
        'zivotinja',
        'nastamba'

    ]) {
        @DoesPropertyExist(Nastamba)
        @IsInt()
        @Type(() => Number)
        nastambaId: number;

        @DoesPropertyExist(Zivotinja)
        @IsInt()
        @Type(() => Number)
        zivotinjaId: number;
    }
