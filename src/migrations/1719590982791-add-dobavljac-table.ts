import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AddDjelatnikTable1719590982791 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "dobavljac",
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
                        name: "ime",
                        type: "varchar",
                        length: '255',                        
                    },
                    {
                        name: "opis",
                        type: "varchar",
                        length: '255',                        
                    },
                    {
                        name: "adresa",
                        type: "varchar",
                        length: '255',                        
                    },
                    {
                        name: 'broj_telefona',
                        type: 'varchar',
                        length: '255',                        
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
            CREATE OR ALTER TRIGGER del_trg_dobavljac
            ON dobavljac
            INSTEAD OF DELETE
            AS
            BEGIN
              THROW 50000, 'Hard delete is not allowed!', 1;
            END;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TRIGGER IF EXISTS del_trg_dobavljac
        `);
        await queryRunner.dropTable("dobavljac");
    }

}
