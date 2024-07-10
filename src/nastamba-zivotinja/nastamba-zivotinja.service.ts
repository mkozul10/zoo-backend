import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNastambaZivotinjaDto } from './dto/create-nastamba-zivotinja.dto';
import { UpdateNastambaZivotinjaDto } from './dto/update-nastamba-zivotinja.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NastambaZivotinja } from './entities/nastamba-zivotinja.entity';
import { Repository } from 'typeorm';
import { SuccessDeleteDto } from 'src/dto/success-delete.dto';
import { HelperService } from 'src/helper/helper.service';

@Injectable()
export class NastambaZivotinjaService {
  constructor(
    @InjectRepository(NastambaZivotinja)
    private nastambZivotinjaRepo: Repository<NastambaZivotinja>,
    private helperService: HelperService
  ) {}
  async create(createNastambaZivotinjaDto: CreateNastambaZivotinjaDto) {
    const nastambaZivotinja = await this.nastambZivotinjaRepo.save(createNastambaZivotinjaDto);
    return {
      data: nastambaZivotinja,
      count: 1
    }
  }

  async findAll(search: string) {
    const whereConditions = this.helperService.getWhereClause(
      search,
      ['id', 'kolicina', 'nastambaId', 'zivotinjaId'],
    );
    const [data, count] = await this.nastambZivotinjaRepo.findAndCount({
      where: whereConditions.length > 0 ? whereConditions : undefined,
    });
    return {
      data,
      count
    }
  }

  async findOne(id: number) {
    const nastambZivotinja = await this.nastambZivotinjaRepo.findOne({ where: { id } });
    if (!nastambZivotinja) throw new BadRequestException(`NastambaZivotinja with id ${id} not found`);
    return {
      data: nastambZivotinja,
      count: 1
    };
  }

  async update(id: number, updateNastambaZivotinjaDto: UpdateNastambaZivotinjaDto) {
    const update = await this.nastambZivotinjaRepo.update({ id }, updateNastambaZivotinjaDto);
    if (!update.affected) throw new BadRequestException(`NastambaZivotinja with id ${id} not found`);
    const data = await this.nastambZivotinjaRepo.findOne({ where: { id } });
    return {
      data,
      count: 1
    }
  }

  async remove(id: number) {
    const deleteResult = await this.nastambZivotinjaRepo.softDelete({ id });
    if (!deleteResult.affected) throw new BadRequestException(`NastambaZivotinja with id ${id} not found`);
    const result = new SuccessDeleteDto(id, 'NastambaZivotinja');
    return result;
  }
}
