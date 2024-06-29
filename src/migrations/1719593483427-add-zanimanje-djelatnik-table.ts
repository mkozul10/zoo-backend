import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AddZanimanjeDjelatnikTable1719593483427 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "zanimanje_djelatnik",
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
                        name: 'licenca',
                        type: 'bit'
                    },
                    {
                        name: 'istek_licence',
                        type: 'datetime2',
                        isNullable: true
                    },
                    {
                        name: 'zanimanje_id',
                        type: 'int'
                    },
                    {
                        name: 'djelatnik_id',
                        type: 'int'
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

        await queryRunner.createForeignKey('zanimanje_djelatnik', new TableForeignKey({
            name: 'fk_zanimanje_djelatnik_zanimanje_1',
            columnNames: ['zanimanje_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'zanimanje'
        }));

        await queryRunner.createForeignKey('zanimanje_djelatnik', new TableForeignKey({
            name: 'fk_zanimanje_djelatnik_djelatnik_1',
            columnNames: ['djelatnik_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'djelatnik'
        }));

        await queryRunner.query(`
            CREATE OR ALTER TRIGGER del_trg_zanimanje_djelatnik
            ON zanimanje_djelatnik
            INSTEAD OF DELETE
            AS
            BEGIN
              THROW 50000, 'Hard delete is not allowed!', 1;
            END;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TRIGGER IF EXISTS del_trg_zanimanje_djelatnik
        `);
        await queryRunner.dropForeignKey('zanimanje_djelatnik', 'fk_zanimanje_djelatnik_zanimanje_1');
        await queryRunner.dropForeignKey('zanimanje_djelatnik', 'fk_zanimanje_djelatnik_djelatnik_1');
        await queryRunner.dropTable("zanimanje_djelatnik");
    }

}
