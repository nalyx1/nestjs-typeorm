import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddUsersIdToUsersSkillsTable1667707608660
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users_skills',
      new TableColumn({
        name: 'usersId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'users_skills',
      new TableForeignKey({
        name: 'users_skills_users',
        columnNames: ['usersId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users_skills', 'users_skills_users');

    await queryRunner.dropColumn('users_skills', 'usersId');
  }
}
