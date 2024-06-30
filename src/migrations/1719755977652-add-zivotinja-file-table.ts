import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AddZivotinjaFileTable1719755977652 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: 'zivotinja_file',
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
                        name: 'file_name',
                        type: 'nvarchar',
                        length: '255',
                        isUnique: true
                    },
                    {
                        name: 'file_type',
                        type: 'nvarchar',
                        length: '255'
                    },
                    {
                        name: 'file_data',
                        type: 'varbinary',
                        length: 'max'
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
            }), true
        );

        await queryRunner.createForeignKey('zivotinja_file', new TableForeignKey({
            name: 'fk_zivotinja_file_zivotinja_1',
            columnNames: ['zivotinja_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'zivotinja'
        }));

        await queryRunner.query(`
            CREATE OR ALTER TRIGGER del_trg_zivotinja_file
            ON zivotinja_file
            INSTEAD OF DELETE
            AS
            BEGIN
              THROW 50000, 'Hard delete is not allowed!', 1;
            END;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            DROP TRIGGER IF EXISTS del_trg_zivotinja_file
        `);
        await queryRunner.dropForeignKey('zivotinja_file', 'fk_zivotinja_file_zivotinja_1');
        await queryRunner.dropTable("zivotinja_file");
    }

}
