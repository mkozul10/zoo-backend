import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AddBiljkaNastambaTable1719595291315 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "biljka_nastamba",
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
                        name: 'biljka_id',
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

        await queryRunner.createForeignKey('biljka_nastamba', new TableForeignKey({
            name: 'fk_biljka_nastamba_biljka_1',
            columnNames: ['biljka_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'biljka'
        }));

        await queryRunner.createForeignKey('biljka_nastamba', new TableForeignKey({
            name: 'fk_biljka_nastamba_nastamba_1',
            columnNames: ['nastamba_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'nastamba'
        }));

        await queryRunner.query(`
            CREATE OR ALTER TRIGGER del_trg_biljka_nastamba
            ON biljka_nastamba
            INSTEAD OF DELETE
            AS
            BEGIN
              THROW 50000, 'Hard delete is not allowed!', 1;
            END;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TRIGGER IF EXISTS del_trg_biljka_nastamba
        `);
        await queryRunner.dropForeignKey('biljka_nastamba', 'fk_biljka_nastamba_biljka_1');
        await queryRunner.dropForeignKey('biljka_nastamba', 'fk_biljka_nastamba_nastamba_1');
        await queryRunner.dropTable("biljka_nastamba");
    }

}
