import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AddSekundarneZivotinjeTable1719597269638 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "sekundarne_zivotinje",
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
                        name: 'kolicina',
                        type: 'int',
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: 'nastamba_id',
                        type: 'int'
                    },
                    {
                        name: 'zivotinja_id',
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

        await queryRunner.createForeignKey('sekundarne_zivotinje', new TableForeignKey({
            name: 'fk_sekundarne_zivotinje_nastamba_1',
            columnNames: ['nastamba_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'nastamba'
        }));

        await queryRunner.createForeignKey('sekundarne_zivotinje', new TableForeignKey({
            name: 'fk_sekundarne_zivotinje_zivotinja_1',
            columnNames: ['zivotinja_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'zivotinja'
        }));

        await queryRunner.query(`
            CREATE OR ALTER TRIGGER del_trg_sekundarne_zivotinje
            ON sekundarne_zivotinje
            INSTEAD OF DELETE
            AS
            BEGIN
              THROW 50000, 'Hard delete is not allowed!', 1;
            END;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TRIGGER IF EXISTS del_trg_sekundarne_zivotinje
        `);
        await queryRunner.dropForeignKey('sekundarne_zivotinje', 'fk_sekundarne_zivotinje_nastamba_1');
        await queryRunner.dropForeignKey('sekundarne_zivotinje', 'fk_sekundarne_zivotinje_zivotinja_1');
        await queryRunner.dropTable("sekundarne_zivotinje");
    }

}
