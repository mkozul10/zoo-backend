import { PartialType } from '@nestjs/swagger';
import { CreateZivotinjaDto } from './create-zivotinja.dto';

export class UpdateZivotinjaDto extends PartialType(CreateZivotinjaDto) {}
