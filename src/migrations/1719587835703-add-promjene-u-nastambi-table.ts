import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AddPromjeneUNastambiTable1719587835703 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "promjene_u_nastambi",
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
                        name: "naziv",
                        type: "varchar",
                        length: '255',
                        isUnique: true
                    },
                    {
                        name: "razlog",
                        type: "varchar",
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: "vrsta",
                        type: "varchar",
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: 'nastamba_id',
                        type: 'int',
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

        await queryRunner.createForeignKey('promjene_u_nastambi', new TableForeignKey({
            name: 'fk_promjene_u_nastambi_nastamba_1',
            columnNames: ['nastamba_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'nastamba'
        }));

        await queryRunner.query(`
            CREATE OR ALTER TRIGGER del_trg_promjene_u_nastambi
            ON promjene_u_nastambi
            INSTEAD OF DELETE
            AS
            BEGIN
              THROW 50000, 'Hard delete is not allowed!', 1;
            END;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TRIGGER IF EXISTS del_trg_promjene_u_nastambi
        `);
        await queryRunner.dropForeignKey('promjene_u_nastambi', 'fk_promjene_u_nastambi_nastamba_1');
        await queryRunner.dropTable("promjene_u_nastambi");
    }

}
