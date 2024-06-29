import { ApiProperty } from "@nestjs/swagger";

export class ErrorDto {
  @ApiProperty({
    type: Number,
  })
  statusCode: number;
    
  @ApiProperty()
  message: string;
}