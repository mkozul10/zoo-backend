import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class GrupnaTuraDjelatnik1719594940865 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "grupna_tura_djelatnik",
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
                        name: 'grupna_tura_id',
                        type: 'int'
                    },
                    {
                        name: 'djelatnik_id',
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

        await queryRunner.createForeignKey('grupna_tura_djelatnik', new TableForeignKey({
            name: 'fk_grupna_tura_djelatnik_grupna_tura_1',
            columnNames: ['grupna_tura_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'grupna_tura'
        }));

        await queryRunner.createForeignKey('grupna_tura_djelatnik', new TableForeignKey({
            name: 'fk_grupna_tura_djelatnik_djelatnik_1',
            columnNames: ['djelatnik_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'djelatnik'
        }));

        await queryRunner.query(`
            CREATE OR ALTER TRIGGER del_trg_grupna_tura_djelatnik
            ON grupna_tura_djelatnik
            INSTEAD OF DELETE
            AS
            BEGIN
              THROW 50000, 'Hard delete is not allowed!', 1;
            END;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TRIGGER IF EXISTS del_trg_grupna_tura_djelatnik
        `);
        await queryRunner.dropForeignKey('grupna_tura_djelatnik', 'fk_grupna_tura_djelatnik_grupna_tura_1');
        await queryRunner.dropForeignKey('grupna_tura_djelatnik', 'fk_grupna_tura_djelatnik_djelatnik_1');
        await queryRunner.dropTable("grupna_tura_djelatnik");
    }

}
