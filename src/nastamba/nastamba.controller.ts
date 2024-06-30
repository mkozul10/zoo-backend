import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NastambaService } from './nastamba.service';
import { CreateNastambaDto } from './dto/create-nastamba.dto';
import { UpdateNastambaDto } from './dto/update-nastamba.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConflictResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ErrorDto } from 'src/dto/error.dto';
import { SearchDto } from 'src/dto/search.dto';
import { ParamIdDto } from 'src/dto/param-id.dto';
import { ResponseNastambaDto } from './dto/response-nastamba.dto';
import { ResponseNastambaAllDto } from './dto/response-nastamba-all.dto';
import { SuccessDeleteDto } from '../dto/success-delete.dto';

@ApiUnauthorizedResponse({ type: ErrorDto })
@ApiBadRequestResponse({ type: ErrorDto })
@ApiNotFoundResponse({ type: ErrorDto })
@ApiInternalServerErrorResponse({ type: ErrorDto })
@ApiBadRequestResponse({ type: ErrorDto })
@ApiConflictResponse({ type: ErrorDto })
@ApiTags('nastamba')
@ApiBearerAuth('access-token')
@Controller('nastamba')
export class NastambaController {
  constructor(private readonly nastambaService: NastambaService) {}

  @ApiBody({ type: CreateNastambaDto })
  @ApiOkResponse({ type: ResponseNastambaDto })
  @Post()
  async create(@Body() createNastambaDto: CreateNastambaDto) {
    return await this.nastambaService.create(createNastambaDto);
  }

  @ApiOkResponse({ type: ResponseNastambaAllDto })
  @Get()
  async findAll(@Query() searchDto: SearchDto) {
    return await this.nastambaService.findAll(searchDto.search);
  }

  @ApiOkResponse({ type: ResponseNastambaDto })
  @Get(':id')
  findOne(@Param() paramIdDto: ParamIdDto) {
    return this.nastambaService.findOne(paramIdDto.id);
  }

  @ApiBody({ type: UpdateNastambaDto })
  @ApiOkResponse({ type: ResponseNastambaDto })
  @Patch(':id')
  update(@Param() paramIdDto: ParamIdDto, @Body() updateNastambaDto: UpdateNastambaDto) {
    return this.nastambaService.update(paramIdDto.id, updateNastambaDto);
  }

  @ApiOkResponse({ type: SuccessDeleteDto })
  @Delete(':id')
  remove(@Param() paramIdDto: ParamIdDto) {
    return this.nastambaService.remove(paramIdDto.id);
  }
}
