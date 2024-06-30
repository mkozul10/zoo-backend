import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive } from "class-validator";
import { Type } from 'class-transformer';

export class ParamIdDto {
    @ApiProperty({ type: Number, description: 'Id of the entity' })
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    id: number;
}