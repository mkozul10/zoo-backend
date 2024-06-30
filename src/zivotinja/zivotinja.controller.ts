import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, ClassSerializerInterceptor, UploadedFile } from '@nestjs/common';
import { ZivotinjaService } from './zivotinja.service';
import { CreateZivotinjaDto } from './dto/create-zivotinja.dto';
import { UpdateZivotinjaDto } from './dto/update-zivotinja.dto';
import { ApiUnauthorizedResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse, ApiConflictResponse, ApiTags, ApiBearerAuth, ApiBody, ApiOkResponse, ApiConsumes, ApiCreatedResponse } from '@nestjs/swagger';
import { ErrorDto } from 'src/dto/error.dto';
import { ResponseZivotinjaDto } from './dto/response-zivotinja.dto';
import { ResponseZivotinjaAllDto } from './dto/response-zivotinja-all.dto';
import { SearchDto } from 'src/dto/search.dto';
import { ParamIdDto } from 'src/dto/param-id.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateZivotinjaApiBodyOptions } from './dto/api-body-options.dto';

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

  @UseInterceptors(ClassSerializerInterceptor, FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody(CreateZivotinjaApiBodyOptions)
  @ApiCreatedResponse({ type: ResponseZivotinjaDto })
  @Post()
  async create(
    @Body() createZivotinjaDto: CreateZivotinjaDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.zivotinjaService.create(createZivotinjaDto, file);
  }

  @ApiOkResponse({ type: ResponseZivotinjaAllDto })
  @Get()
  async findAll(@Query() searchDto: SearchDto) {
    return await this.zivotinjaService.findAll(searchDto.search);
  }

  @ApiOkResponse({ type: ResponseZivotinjaDto })
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
