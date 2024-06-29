import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AddZivotinjaTable1719591405424 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "zivotinja",
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
                        name: "latinski_naziv",
                        type: "varchar",
                        length: '255'
                    },
                    {
                        name: "engleski_naziv",
                        type: "varchar",
                        length: '255'
                    },
                    {
                        name: "hrvatski_naziv",
                        type: "varchar",
                        length: '255'
                    },
                    {
                        name: "ime",
                        type: "varchar",
                        length: '255'
                    },
                    {
                        name: 'spol',
                        type: 'varchar',
                        length: '1'
                    },
                    {
                        name: "opis_dobivanja",
                        type: "varchar",
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: "datum_dobivanja",
                        type: "datetime2",
                        isNullable: true
                    },
                    {
                        name: "razlog_brisanja",
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
            CREATE OR ALTER TRIGGER del_trg_zivotinja
            ON zivotinja
            INSTEAD OF DELETE
            AS
            BEGIN
              THROW 50000, 'Hard delete is not allowed!', 1;
            END;
        `);


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TRIGGER IF EXISTS del_trg_zivotinja
        `);
        await queryRunner.dropTable("zivotinja");
    }

}
