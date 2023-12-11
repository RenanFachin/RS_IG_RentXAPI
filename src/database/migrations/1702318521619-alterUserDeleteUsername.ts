/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class alterUserDeleteUsername1702318521619
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'username')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name: "username",
            type: "varchar"
        }))
    }
}
