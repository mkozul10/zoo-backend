import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, Query } from '@nestjs/common';
import { NastambaZivotinjaService } from './nastamba-zivotinja.service';
import { CreateNastambaZivotinjaDto } from './dto/create-nastamba-zivotinja.dto';
import { UpdateNastambaZivotinjaDto } from './dto/update-nastamba-zivotinja.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ErrorDto } from 'src/dto/error.dto';
import { ResponseNastambaZivotinjaDto } from './dto/response-nastamba-zivotinja.dto';
import { ResponseNastambaZivotinjaAllDto } from './dto/response-nastamba-zivotinja-all.dto';
import { SearchDto } from 'src/dto/search.dto';
import { ParamIdDto } from 'src/dto/param-id.dto';
import { SuccessDeleteDto } from 'src/dto/success-delete.dto';

@ApiUnauthorizedResponse({ type: ErrorDto })
@ApiBadRequestResponse({ type: ErrorDto })
@ApiNotFoundResponse({ type: ErrorDto })
@ApiInternalServerErrorResponse({ type: ErrorDto })
@ApiBadRequestResponse({ type: ErrorDto })
@ApiConflictResponse({ type: ErrorDto })
@ApiTags('nastamba-zivotinja')
@ApiBearerAuth('access-token')
@Controller('nastamba-zivotinja')
export class NastambaZivotinjaController {
  constructor(private readonly nastambaZivotinjaService: NastambaZivotinjaService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: CreateNastambaZivotinjaDto })
  @ApiCreatedResponse({ type: ResponseNastambaZivotinjaDto })
  @Post()
  async create(@Body() createNastambaZivotinjaDto: CreateNastambaZivotinjaDto) {
    return await this.nastambaZivotinjaService.create(createNastambaZivotinjaDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ type: ResponseNastambaZivotinjaAllDto })
  @Get()
  async findAll(@Query() searchDto: SearchDto) {
    return await this.nastambaZivotinjaService.findAll(searchDto.search);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ type: ResponseNastambaZivotinjaDto })
  @Get(':id')
  async findOne(@Param() paramIdDto: ParamIdDto) {
    return await this.nastambaZivotinjaService.findOne(paramIdDto.id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: UpdateNastambaZivotinjaDto })
  @ApiOkResponse({ type: ResponseNastambaZivotinjaDto })
  @Patch(':id')
  async update(@Param() paramIdDto: ParamIdDto, @Body() updateNastambaZivotinjaDto: UpdateNastambaZivotinjaDto) {
    return await this.nastambaZivotinjaService.update(paramIdDto.id, updateNastambaZivotinjaDto);
  }

  @ApiOkResponse({ type: SuccessDeleteDto })
  @Delete(':id')
  async remove(@Param() paramIdDto: ParamIdDto) {
    return await this.nastambaZivotinjaService.remove(paramIdDto.id);
  }
}
