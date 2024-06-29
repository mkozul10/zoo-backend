import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AddVrstaTroskaTable1719588776035 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "vrsta_troska",
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

        await queryRunner.dropTable("vrsta_troska");
    }

}
