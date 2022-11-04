import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1666928470182 implements MigrationInterface {
  name = 'NewMigration1666928470182';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "skill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_skills" ("usersId" uuid NOT NULL, "skillId" uuid NOT NULL, CONSTRAINT "PK_576a37a8cc61d3dbecfb66eb4ce" PRIMARY KEY ("usersId", "skillId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a443411b588c6603a9205e0ede" ON "users_skills" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9de18e774763eb53aa1044809d" ON "users_skills" ("skillId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "users_skills" ADD CONSTRAINT "FK_a443411b588c6603a9205e0edeb" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_skills" ADD CONSTRAINT "FK_9de18e774763eb53aa1044809d4" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_skills" DROP CONSTRAINT "FK_9de18e774763eb53aa1044809d4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_skills" DROP CONSTRAINT "FK_a443411b588c6603a9205e0edeb"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9de18e774763eb53aa1044809d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a443411b588c6603a9205e0ede"`,
    );
    await queryRunner.query(`DROP TABLE "users_skills"`);
    await queryRunner.query(`DROP TABLE "skill"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
