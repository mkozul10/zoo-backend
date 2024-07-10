import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';

@Injectable()
export class ValidatorService {}

@ValidatorConstraint({ name: 'CustomValidator', async: true })
@Injectable()
export class CustomValidator implements ValidatorConstraintInterface {
  async validate(name: string, args?: ValidationArguments) {
    const entity = args.constraints[0];
    const entityPropName = args.constraints[1];
    const value = args.value;
    const whereClause = {};
    whereClause[`${entityPropName}`] = value;
    try {
      await entity.findOneOrFail({
        where: whereClause,
      });
    } catch (e) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} (${args.value}) does not exist as ${args.constraints[1]} in related table`;
  }
}

export function DoesPropertyExist(
  entity: any,
  entityPropertyName: string = 'id',
  options?: ValidationOptions,
) {
  return (o: object, propertyName: string) => {
    registerDecorator({
      target: o.constructor,
      propertyName,
      options,
      constraints: [entity, entityPropertyName],
      validator: CustomValidator,
      async: true,
    });
  };
}

@ValidatorConstraint({ name: 'CustomUniqueValidator', async: true })
@Injectable()
export class CustomUniqueValidator implements ValidatorConstraintInterface {
  async validate(name: string, args?: ValidationArguments) {
    const entity = args.constraints[0];
    const propertyName = args.property;
    const value = args.value;
    const whereClause = {};
    whereClause[`${propertyName}`] = value;
    try {
      await entity.findOneOrFail({
        where: whereClause,
        withDeleted: true,
      });
    } catch (e) {
      return true;
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} already exists as ${args.value}`;
  }
}
