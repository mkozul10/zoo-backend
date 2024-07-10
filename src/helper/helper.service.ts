import { Injectable } from '@nestjs/common';
import { Like } from 'typeorm';

@Injectable()
export class HelperService {

    getWhereClause(value: string, numPropArray: string[] = [], stringPropArray: string[] = [], boolPropArray: string[] = [],) {
        const whereConditions = [];

        if (value) {
            stringPropArray.map(prop => {
                whereConditions.push({ [prop]: Like(`%${value}%`) });
            })
          }

        if (value === 'true' || value === 'false') {
            boolPropArray.map(prop => {
                whereConditions.push({ [prop]: value === 'true' });
            });
        }

        const searchNumber = Number(value);
        if (!isNaN(searchNumber)) {
            numPropArray.map(prop => {
                whereConditions.push({ [prop]: searchNumber });
            });
        }
        return whereConditions;
    }
}
