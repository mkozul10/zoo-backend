import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class InsertUserAndStatusData1719668275009 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.changeColumn('bo_user', 'refresh_token', new TableColumn({
            name: 'refresh_token',
            type: 'varchar',
            length: '255',
            isNullable: true
        }));

        await queryRunner.query(`
            INSERT INTO status (naziv) VALUES ('admin');
        `);

        await queryRunner.query(`
            INSERT INTO bo_user (username, password, status_id)
            VALUES (
              'admin',
              '$2b$10$uwtF9rpc4ZRQrNtkfXs1qOyMLHQkPSHXK/QBz3WXRzu4ptA6e.l.S',
              (SELECT id FROM status WHERE naziv = 'admin')
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TRIGGER IF EXISTS del_trg_bo_user
        `);

        await queryRunner.query(`
            DROP TRIGGER IF EXISTS del_trg_bo_status
        `);

        await queryRunner.query(`
            DELETE FROM status WHERE naziv = 'admin';
        `);

        await queryRunner.dropForeignKey('bo_user', 'fk_bo_user_status_1');

        await queryRunner.query(`
            DELETE FROM bo_user WHERE username = 'admin';
        `);

        await queryRunner.query(`
            CREATE OR ALTER TRIGGER del_trg_bo_user
            ON bo_user
            INSTEAD OF DELETE
            AS
            BEGIN
              THROW 50000, 'Hard delete is not allowed!', 1;
            END;
        `);

        await queryRunner.query(`
            CREATE OR ALTER TRIGGER del_trg_status
            ON status
            INSTEAD OF DELETE
            AS
            BEGIN
              THROW 50000, 'Hard delete is not allowed!', 1;
            END;
        `);
    }

}
