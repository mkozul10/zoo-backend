import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AddDjelatnikTable1719593054565 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: "djelatnik",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                        unsigned: true
                    },
                    {
                        name: "ime",
                        type: "varchar",
                        length: '255'
                    },
                    {
                        name: "prezime",
                        type: "varchar",
                        length: '255'
                    },
                    {
                        name: "broj_telefona",
                        type: "varchar",
                        length: '255'
                    },
                    {
                        name: "radno_vrijeme",
                        type: "varchar",
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "datetime2",
                        default: "GETDATE()",
                        onUpdate: "GETDATE()",
                    },
                    {
                        name: "updated_at",
                        type: "datetime2",
                        default: "GETDATE()",
                        onUpdate: "GETDATE()",
                    },
                    {
                        name: "deleted_at",
                        type: "datetime2",
                        isNullable: true,
                    }
                ]
            }),
            true
        );

        await queryRunner.query(`
            CREATE OR ALTER TRIGGER del_trg_zanimanje
            ON zanimanje
            INSTEAD OF DELETE
            AS
            BEGIN
              THROW 50000, 'Hard delete is not allowed!', 1;
            END;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TRIGGER IF EXISTS del_trg_zanimanje
        `);

        await queryRunner.dropTable("djelatnik");
    }

}
