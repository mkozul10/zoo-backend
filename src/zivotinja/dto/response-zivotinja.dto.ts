import { ApiProperty } from "@nestjs/swagger";
import { Zivotinja } from "../entities/zivotinja.entity";

export class ResponseZivotinjaDto {
    @ApiProperty({ type: Zivotinja })
    data: Zivotinja;
    @ApiProperty({ type: Number })
    count: number;
}