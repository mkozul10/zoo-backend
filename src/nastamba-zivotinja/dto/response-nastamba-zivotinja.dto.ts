import { ApiProperty } from "@nestjs/swagger";
import { NastambaZivotinja } from "../entities/nastamba-zivotinja.entity";

export class ResponseNastambaZivotinjaDto {
    @ApiProperty({ type: NastambaZivotinja })
    data: NastambaZivotinja;
    @ApiProperty()
    count: number;
}