import { ApiProperty } from "@nestjs/swagger";
import { NastambaZivotinja } from "../entities/nastamba-zivotinja.entity";

export class ResponseNastambaZivotinjaAllDto {
    @ApiProperty({ type: NastambaZivotinja, isArray: true })
    data: NastambaZivotinja[];
    @ApiProperty()
    count: number;
}