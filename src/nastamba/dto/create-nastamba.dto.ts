import { OmitType } from "@nestjs/swagger";
import { Nastamba } from "../entities/nastamba.entity";

export class CreateNastambaDto extends OmitType(Nastamba, [
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
]) {}
