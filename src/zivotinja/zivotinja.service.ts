import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateZivotinjaDto } from './dto/create-zivotinja.dto';
import { UpdateZivotinjaDto } from './dto/update-zivotinja.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Zivotinja } from './entities/zivotinja.entity';
import { SuccessDeleteDto } from 'src/dto/success-delete.dto';
import { FileEntity } from './entities/file.entity';

@Injectable()
export class ZivotinjaService {
  constructor(
    @InjectRepository(Zivotinja)
    private zivotinjaRepo: Repository<Zivotinja>,
    @InjectRepository(FileEntity)
    private fileRepo: Repository<FileEntity>
  ) {}
  async create(createZivotinjaDto: CreateZivotinjaDto, file: Express.Multer.File) {
    createZivotinjaDto.razlogBrisanja = null;
    const zivotinja = await this.zivotinjaRepo.save(createZivotinjaDto);
    if (file) {
      /*
      {
        fieldname: 'file',
        originalname: 'images.jpeg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        buffer: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff db 00 84 00 09 06 07 12 12 12 15 13 13 13 16 16 15 17 15 17 15 17 15 17 18 18 15 16 17 ... 6367 more bytes>,
        size: 6417
      }
      */

      const fileEntity = new FileEntity();
      fileEntity.fileName = file.originalname;
      fileEntity.fileType = file.mimetype;
      fileEntity.fileData = file.buffer;
      fileEntity.zivotinjaId = zivotinja.id;
      await this.fileRepo.save(fileEntity);
    }
    return {
      data: zivotinja,
      count: 1
    }
  }

  async findAll(search: string) {
    const [data, count] = await this.zivotinjaRepo.findAndCount();
    return {
      data,
      count
    }
  }

  async findOne(id: number) {
    const zivotinja = await this.zivotinjaRepo.findOne({ where: { id }, relations: { files: true } });
    if (!zivotinja) throw new BadRequestException(`Zivotinja with id ${id} not found`);
    return {
      data: zivotinja,
      count: 1
    };
  }

  async update(id: number, updateZivotinjaDto: UpdateZivotinjaDto) {
    const update = await this.zivotinjaRepo.update({ id }, updateZivotinjaDto);
    if (!update.affected) throw new BadRequestException(`Zivotinja with id ${id} not found`);

    if (updateZivotinjaDto.razlogBrisanja) {
      await this.zivotinjaRepo.softDelete({ id });
      const result = new SuccessDeleteDto(id, 'Zivotinja');
      return result;
    }

    const data = await this.zivotinjaRepo.findOne({ where: { id } });
    return {
      data,
      count: 1
    }
  }

  async remove(id: number) {
    const deleteResult = await this.zivotinjaRepo.softDelete({ id });
    if (!deleteResult.affected) throw new BadRequestException(`Zivotinja with id ${id} not found`);
    const result = new SuccessDeleteDto(id, 'Zivotinja');
    return result;
  }
}
