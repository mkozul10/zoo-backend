import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AddPremjesteneZivotinjeTable1719596372823 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "premjestene_zivotinje",
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
                        name: 'zivotinja_nastamba_id',
                        type: 'int'
                    },
                    {
                        name: 'old_nastamba_id',
                        type: 'int'
                    },
                    {
                        name: 'razlog',
                        type: 'varchar',
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

        await queryRunner.createForeignKey('premjestene_zivotinje', new TableForeignKey({
            name: 'fk_premjestene_zivotinje_zivotinja_nastamba_1',
            columnNames: ['zivotinja_nastamba_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'zivotinja_nastamba'
        }));

        await queryRunner.createForeignKey('premjestene_zivotinje', new TableForeignKey({
            name: 'fk_premjestene_zivotinje_nastamba_1',
            columnNames: ['old_nastamba_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'nastamba'
        }));

        await queryRunner.query(`
            CREATE OR ALTER TRIGGER del_trg_premjestene_zivotinje
            ON premjestene_zivotinje
            INSTEAD OF DELETE
            AS
            BEGIN
              THROW 50000, 'Hard delete is not allowed!', 1;
            END;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TRIGGER IF EXISTS del_trg_premjestene_zivotinje
        `);
        await queryRunner.dropForeignKey('premjestene_zivotinje', 'fk_premjestene_zivotinje_zivotinja_nastamba_1');
        await queryRunner.dropForeignKey('premjestene_zivotinje', 'fk_premjestene_zivotinje_nastamba_1');
        await queryRunner.dropTable("premjestene_zivotinje");
    }

}
