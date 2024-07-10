import { PartialType } from '@nestjs/swagger';
import { CreateNastambaZivotinjaDto } from './create-nastamba-zivotinja.dto';

export class UpdateNastambaZivotinjaDto extends PartialType(CreateNastambaZivotinjaDto) {}
