import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AddPrivatneObavezeDjelatnikaTable1719595708401 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "privatne_obaveze_djelatnik",
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
                        name: 'opis',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: 'zatrazeno_do',
                        type: 'datetime2'
                    },
                    {
                        name: 'odobreno',
                        type: 'bit',
                        default: '0'
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

        await queryRunner.createForeignKey('privatne_obaveze_djelatnik', new TableForeignKey({
            name: 'fk_privatne_obaveze_djelatnik_djelatnik_1',
            columnNames: ['djelatnik_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'djelatnik'
        }));

        await queryRunner.query(`
            CREATE OR ALTER TRIGGER del_trg_privatne_obaveze_djelatnik
            ON privatne_obaveze_djelatnik
            INSTEAD OF DELETE
            AS
            BEGIN
              THROW 50000, 'Hard delete is not allowed!', 1;
            END;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TRIGGER IF EXISTS del_trg_privatne_obaveze_djelatnik
        `);
        await queryRunner.dropForeignKey('privatne_obaveze_djelatnik', 'fk_privatne_obaveze_djelatnik_djelatnik_1');
        await queryRunner.dropTable("privatne_obaveze_djelatnik");
    }

}
