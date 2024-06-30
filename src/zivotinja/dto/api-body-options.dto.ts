import { ApiBodyOptions } from '@nestjs/swagger';

export const CreateZivotinjaApiBodyOptions: ApiBodyOptions = {
  schema: {
    type: 'object',
    required: ['latinskiNaziv', 'engleskiNaziv', 'hrvatskiNaziv', 'ime', 'spol', 'datumDobivanja'],
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
      latinskiNaziv: {
        type: 'string',
        maxLength: 255,
        example: 'Panthera tigris'
      },
      engleskiNaziv: {
        type: 'string',
        maxLength: 255,
        example: 'Tiger'
      },
      hrvatskiNaziv: {
        type: 'string',
        maxLength: 255,
        example: 'Tigar',
      },
      ime: {
        type: 'string',
        maxLength: 255,
        example: 'Tiger',
      },
      spol: {
        type: 'string',
        maxLength: 1,
        example: 'F',
      },
      opisDobivanja: {
        type: 'string',
        maxLength: 255,
        example: 'LOrem impsum',
      },
      datumDobivanja: {
        type: 'Date',
        example: '2020-12-31T23:59:59.000Z',
        description: 'YYYY-MM-DDTHH:mm:ss.000Z (ISO format)',
      },
    },
  },
};

export const UpdateZivotinjaApiBodyOptions: ApiBodyOptions = {
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        latinskiNaziv: {
          type: 'string',
          maxLength: 255,
          example: 'Panthera tigris'
        },
        engleskiNaziv: {
          type: 'string',
          maxLength: 255,
          example: 'Tiger'
        },
        hrvatskiNaziv: {
          type: 'string',
          maxLength: 255,
          example: 'Tigar',
        },
        ime: {
          type: 'string',
          maxLength: 255,
          example: 'Tiger',
        },
        spol: {
          type: 'number',
          maxLength: 1,
          example: 'F',
        },
        opisDobivanja: {
          type: 'string',
          maxLength: 255,
          example: 'LOrem impsum',
        },
        datumDobivanja: {
          type: 'Date',
          example: '2020-12-31T23:59:59.000Z',
        },
      },
    },
  };
