import { PartialType } from '@nestjs/swagger';
import { CreateNastambaDto } from './create-nastamba.dto';

export class UpdateNastambaDto extends PartialType(CreateNastambaDto) {}
