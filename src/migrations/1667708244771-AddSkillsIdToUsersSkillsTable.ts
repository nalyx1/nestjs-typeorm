import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddSkillsIdToUsersSkillsTable1667708244771
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users_skills',
      new TableColumn({
        name: 'skillsId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'users_skills',
      new TableForeignKey({
        name: 'users_skills_skills',
        columnNames: ['skillsId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'skills',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users_skills', 'users_skills_skills');

    await queryRunner.dropColumn('users_skills', 'skillsId');
  }
}
