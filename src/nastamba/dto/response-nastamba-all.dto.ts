import { ApiProperty } from "@nestjs/swagger";
import { Nastamba } from "../entities/nastamba.entity";

export class ResponseNastambaAllDto {
    @ApiProperty({ type: Nastamba, isArray: true })
    data: Nastamba[];
    @ApiProperty()
    count: number;
}