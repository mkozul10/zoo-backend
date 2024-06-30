import { ApiProperty } from "@nestjs/swagger";

export class SuccessDeleteDto {
    private id: number;
    private entityName: string;
    constructor(
        id: number,
        entityName: string
    ) {
        this.message = `${entityName} with id ${id} deleted successfully.`;
    }
    @ApiProperty()
    message: string;
    @ApiProperty()
    statusCode: number = 200;
}