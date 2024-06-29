import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AddTrosakDobavljacTable1719598428425 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "trosak_dobavljac",
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
                        name: 'trosak_id',
                        type: 'int'
                    },
                    {
                        name: 'dobavljac_id',
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

        await queryRunner.createForeignKey('trosak_dobavljac', new TableForeignKey({
            name: 'fk_trosak_dobavljac_trosak_1',
            columnNames: ['trosak_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'trosak'
        }));

        await queryRunner.createForeignKey('trosak_dobavljac', new TableForeignKey({
            name: 'fk_trosak_dobavljac_dobavljac_1',
            columnNames: ['dobavljac_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'dobavljac'
        }));

        await queryRunner.query(`
            CREATE OR ALTER TRIGGER del_trg_trosak_dobavljac
            ON trosak_dobavljac
            INSTEAD OF DELETE
            AS
            BEGIN
              THROW 50000, 'Hard delete is not allowed!', 1;
            END;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TRIGGER IF EXISTS del_trg_trosak_dobavljac
        `);
        await queryRunner.dropForeignKey('trosak_dobavljac', 'fk_trosak_dobavljac_trosak_1');
        await queryRunner.dropForeignKey('trosak_dobavljac', 'fk_trosak_dobavljac_dobavljac_1');
        await queryRunner.dropTable("trosak_dobavljac");
    }

}
