import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNastambaDto } from './dto/create-nastamba.dto';
import { UpdateNastambaDto } from './dto/update-nastamba.dto';
import { Repository } from 'typeorm';
import { Nastamba } from './entities/nastamba.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SuccessDeleteDto } from '../dto/success-delete.dto';
import { HelperService } from 'src/helper/helper.service';

@Injectable()
export class NastambaService {
  constructor(
    @InjectRepository(Nastamba)
    private nastambaRepo: Repository<Nastamba>,
    private helperService: HelperService
  ) {}
  async create(createNastambaDto: CreateNastambaDto) {
    const nastamba = await this.nastambaRepo.save(createNastambaDto);
    return {
      data: nastamba,
      count: 1
    }
  }

  async findAll(search: string) {
    const whereConditions = this.helperService.getWhereClause(
      search,
      ['polX', 'polY', 'id'],
      ['naziv', 'vrsta'],
    );
    const [data, count] = await this.nastambaRepo.findAndCount({
      where: whereConditions.length > 0 ? whereConditions : undefined,
    });
    return {
      data,
      count
    }
  }

  async findOne(id: number) {
    const nastamba = await this.nastambaRepo.findOne({ where: { id } });
    if (!nastamba) throw new BadRequestException(`Nastamba with id ${id} not found`);
    return {
      data: nastamba,
      count: 1
    };
  }

  async update(id: number, updateNastambaDto: UpdateNastambaDto) {
    const update = await this.nastambaRepo.update({ id }, updateNastambaDto);
    if (!update.affected) throw new BadRequestException(`Nastamba with id ${id} not found`);
    const data = await this.nastambaRepo.findOne({ where: { id } });
    return {
      data,
      count: 1
    }
  }

  async remove(id: number) {
    const deleteResult = await this.nastambaRepo.softDelete({ id });
    if (!deleteResult.affected) throw new BadRequestException(`Nastamba with id ${id} not found`);
    const result = new SuccessDeleteDto(id, 'Nastamba');
    return result;
  }
}
