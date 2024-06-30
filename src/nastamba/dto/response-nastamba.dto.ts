import { ApiProperty } from "@nestjs/swagger";
import { Nastamba } from "../entities/nastamba.entity";

export class ResponseNastambaDto {
    @ApiProperty({ type: Nastamba })
    data: Nastamba;
    @ApiProperty()
    count: number;
}