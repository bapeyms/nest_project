import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescription1790678214730 implements MigrationInterface {
    name = 'AddDescription1790678214730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "description"`);
    }

}
