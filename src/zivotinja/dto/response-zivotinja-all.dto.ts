import { ApiProperty } from "@nestjs/swagger";
import { Zivotinja } from "../entities/zivotinja.entity";

export class ResponseZivotinjaAllDto {
    @ApiProperty({ type: Zivotinja, isArray: true })
    data: Zivotinja[];
    @ApiProperty({ type: Number })
    count: number;
}