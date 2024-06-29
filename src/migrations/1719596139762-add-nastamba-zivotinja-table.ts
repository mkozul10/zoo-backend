import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AddNastambaZivotinjaTable1719596139762 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "zivotinja_nastamba",
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
                        name: 'status',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: 'kolicina',
                        type: 'int'
                    },
                    {
                        name: 'zivotinja_id',
                        type: 'int'
                    },
                    {
                        name: 'nastamba_id',
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

        await queryRunner.createForeignKey('zivotinja_nastamba', new TableForeignKey({
            name: 'fk_zivotinja_nastamba_zivotinja_1',
            columnNames: ['zivotinja_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'zivotinja'
        }));

        await queryRunner.createForeignKey('zivotinja_nastamba', new TableForeignKey({
            name: 'fk_zivotinja_nastamba_nastamba_1',
            columnNames: ['nastamba_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'nastamba'
        }));

        await queryRunner.query(`
            CREATE OR ALTER TRIGGER del_trg_zivotinja_nastamba
            ON zivotinja_nastamba
            INSTEAD OF DELETE
            AS
            BEGIN
              THROW 50000, 'Hard delete is not allowed!', 1;
            END;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TRIGGER IF EXISTS del_trg_zivotinja_nastamba
        `);
        await queryRunner.dropForeignKey('zivotinja_nastamba', 'fk_zivotinja_nastamba_zivotinja_1');
        await queryRunner.dropForeignKey('zivotinja_nastamba', 'fk_zivotinja_nastamba_nastamba_1');
        await queryRunner.dropTable("zivotinja_nastamba");
    }

}
