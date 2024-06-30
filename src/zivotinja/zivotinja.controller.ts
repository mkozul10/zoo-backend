import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ZivotinjaService } from './zivotinja.service';
import { CreateZivotinjaDto } from './dto/create-zivotinja.dto';
import { UpdateZivotinjaDto } from './dto/update-zivotinja.dto';
import { ApiUnauthorizedResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse, ApiConflictResponse, ApiTags, ApiBearerAuth, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { ErrorDto } from 'src/dto/error.dto';
import { ResponseZivotinjaDto } from './dto/response-zivotinja.dto';
import { ResponseZivotinjaAllDto } from './dto/response-zivotinja-all.dto';
import { SearchDto } from 'src/dto/search.dto';
import { ParamIdDto } from 'src/dto/param-id.dto';

@ApiUnauthorizedResponse({ type: ErrorDto })
@ApiBadRequestResponse({ type: ErrorDto })
@ApiNotFoundResponse({ type: ErrorDto })
@ApiInternalServerErrorResponse({ type: ErrorDto })
@ApiBadRequestResponse({ type: ErrorDto })
@ApiConflictResponse({ type: ErrorDto })
@ApiTags('zivotinja')
@ApiBearerAuth('access-token')
@Controller('zivotinja')
export class ZivotinjaController {
  constructor(private readonly zivotinjaService: ZivotinjaService) {}

  @ApiBody({ type: CreateZivotinjaDto })
  @ApiOkResponse({ type: ResponseZivotinjaDto })
  @Post()
  async create(@Body() createZivotinjaDto: CreateZivotinjaDto) {
    return await this.zivotinjaService.create(createZivotinjaDto);
  }

  @ApiOkResponse({ type: ResponseZivotinjaAllDto })
  @Get()
  async findAll(@Query() searchDto: SearchDto) {
    return await this.zivotinjaService.findAll(searchDto.search);
  }

  @Get(':id')
  async findOne(@Param() paramIdDto: ParamIdDto) {
    return await this.zivotinjaService.findOne(paramIdDto.id);
  }

  @Patch(':id')
  async update(@Param() paramIdDto: ParamIdDto, @Body() updateZivotinjaDto: UpdateZivotinjaDto) {
    return await this.zivotinjaService.update(paramIdDto.id, updateZivotinjaDto);
  }

  @Delete(':id')
  async remove(@Param() paramIdDto: ParamIdDto) {
    return await this.zivotinjaService.remove(paramIdDto.id);
  }
}
