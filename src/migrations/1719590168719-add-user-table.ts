import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AddUserTable1719590168719 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "bo_user",
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
                        name: "username",
                        type: "varchar",
                        length: '255',                        
                        isUnique: true
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: '255',                        
                    },
                    {
                        name: "refresh_token",
                        type: "varchar",
                        length: '255'
                    },
                    {
                        name: 'status_id',
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

        await queryRunner.createForeignKey('bo_user', new TableForeignKey({
            name: 'fk_bo_user_status_1',
            columnNames: ['status_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'status'
        }));

        await queryRunner.query(`
            CREATE OR ALTER TRIGGER del_trg_bo_user
            ON bo_user
            INSTEAD OF DELETE
            AS
            BEGIN
              THROW 50000, 'Hard delete is not allowed!', 1;
            END;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TRIGGER IF EXISTS del_trg_bo_user
        `);
        await queryRunner.dropForeignKey('bo_user', 'fk_bo_user_status_1');
        await queryRunner.dropTable("bo_user");
    }

}
