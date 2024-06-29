import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AddTrosakTable1719598057702 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "trosak",
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
                        name: 'potroseno_sati',
                        type: 'int',
                        isNullable: true
                    },
                    {
                        name: 'potroseno_novca',
                        type: 'varchar',
                        length: '25',
                        isNullable: true
                    },
                    {
                        name: 'zivotinja_nastamba_id',
                        type: 'int'
                    },
                    {
                        name: 'vrsta_troska_id',
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

        await queryRunner.createForeignKey('trosak', new TableForeignKey({
            name: 'fk_trosak_zivotinja_nastamba_1',
            columnNames: ['zivotinja_nastamba_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'zivotinja_nastamba'
        }));

        await queryRunner.createForeignKey('trosak', new TableForeignKey({
            name: 'fk_trosak_vrsta_troska_1',
            columnNames: ['vrsta_troska_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'vrsta_troska'
        }));

        await queryRunner.query(`
            CREATE OR ALTER TRIGGER del_trg_vrsta_troska
            ON vrsta_troska
            INSTEAD OF DELETE
            AS
            BEGIN
              THROW 50000, 'Hard delete is not allowed!', 1;
            END;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TRIGGER IF EXISTS del_trg_vrsta_troska
        `);
        await queryRunner.dropForeignKey('vrsta_troska', 'fk_trosak_zivotinja_nastamba_1');
        await queryRunner.dropForeignKey('vrsta_troska', 'fk_trosak_vrsta_troska_1');
        await queryRunner.dropTable("vrsta_troska");
    }

}
