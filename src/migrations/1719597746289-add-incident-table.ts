import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AddIncidentTable1719597746289 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "incident",
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
                        name: 'opis_incidenta',
                        type: 'varchar',
                        length: '255'
                    },
                    {
                        name: 'zivotinja_nastamba_id',
                        type: 'int'
                    },
                    {
                        name: 'vrsta_incidenta_id',
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

        await queryRunner.createForeignKey('incident', new TableForeignKey({
            name: 'fk_incident_zivotinja_nastamba_1',
            columnNames: ['zivotinja_nastamba_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'zivotinja_nastamba'
        }));

        await queryRunner.createForeignKey('incident', new TableForeignKey({
            name: 'fk_incident_vrsta_incidenta_1',
            columnNames: ['vrsta_incidenta_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'vrsta_incidenta'
        }));

        await queryRunner.query(`
            CREATE OR ALTER TRIGGER del_trg_vrsta_incidenta
            ON vrsta_incidenta
            INSTEAD OF DELETE
            AS
            BEGIN
              THROW 50000, 'Hard delete is not allowed!', 1;
            END;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TRIGGER IF EXISTS del_trg_vrsta_incidenta
        `);
        await queryRunner.dropForeignKey('vrsta_incidenta', 'fk_incident_zivotinja_nastamba_1');
        await queryRunner.dropForeignKey('vrsta_incidenta', 'fk_incident_vrsta_incidenta_1');
        await queryRunner.dropTable("vrsta_incidenta");
    }

}
