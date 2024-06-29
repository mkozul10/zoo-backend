import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AddPredmetNastambaTable1719596962623 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "predmet_nastamba",
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
                        name: 'predmet_id',
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

        await queryRunner.createForeignKey('predmet_nastamba', new TableForeignKey({
            name: 'fk_predmet_nastamba_predmet_1',
            columnNames: ['predmet_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'predmet'
        }));

        await queryRunner.createForeignKey('predmet_nastamba', new TableForeignKey({
            name: 'fk_predmet_nastamba_nastamba_1',
            columnNames: ['nastamba_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'nastamba'
        }));

        await queryRunner.query(`
            CREATE OR ALTER TRIGGER del_trg_predmet_nastamba
            ON predmet_nastamba
            INSTEAD OF DELETE
            AS
            BEGIN
              THROW 50000, 'Hard delete is not allowed!', 1;
            END;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TRIGGER IF EXISTS del_trg_predmet_nastamba
        `);
        await queryRunner.dropForeignKey('predmet_nastamba', 'fk_predmet_nastamba_predmet_1');
        await queryRunner.dropForeignKey('predmet_nastamba', 'fk_predmet_nastamba_nastamba_1');
        await queryRunner.dropTable("predmet_nastamba");
    }

}
