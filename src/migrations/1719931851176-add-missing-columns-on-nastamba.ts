import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddMissingColumnsOnNastamba1719931851176 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('nastamba', [
            new TableColumn({
                name: 'pol_x',
                type: 'float',
                isNullable: true
            }),
            new TableColumn({
                name: 'pol_y',
                type: 'float',
                isNullable: true
            })
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('nastamba', [
            'pol_x',
            'pol_y'
        ]);
    }

}
